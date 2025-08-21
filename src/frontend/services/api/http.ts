import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "../config";
import { getAccessToken } from "../token";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/** this interface defines the structure of an http request
 *  - method: what is the request type?
 *  - path: which endpoint are you sending the request to?
 *  - query: are you sending query parameters?
 *  - body: are you sending data in your request?
 *  - signal: Optional abort signal
 *  - auth: do we have authentication to access the resource?
 *  - headers: additional information? */
export interface RequestOptions {
  method?: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  signal?: AbortSignal;
  auth?: boolean;
  headers?: Record<string, string>;
}

// build the url that will direct your http request
function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(path, API_BASE_URL);
  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

// sleep for ms milliseconds
function sleep(ms: number): Promise<void> {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}

// fetch to input (url) with init (request options) attempts times
async function fetchWithRetry(input: RequestInfo, init: RequestInit, attempts: number): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(input, init);
      if (res.status >= 500 && i < attempts - 1) {
        await sleep(200 * Math.pow(2, i));
        continue;
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        await sleep(200 * Math.pow(2, i));
        continue;
      }
      throw lastErr;
    }
  }
  throw lastErr;
}

export async function request<T>(opts: RequestOptions): Promise<T> {
  const method = opts.method ?? "GET";
  const url = buildUrl(opts.path, opts.query);
  
  const headers: Record<string, string> = {
    "Accept": "application/json",
    ...(opts.body ? { "Content-Type": "application/json" } : {}),
    ...(opts.headers ?? {}),
  };
  if (opts.auth) {
    const token = await getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  };
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  try {
    const init: RequestInit = {
      method,
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal ?? controller.signal,
    };

    const attempts = method === "GET" ? 3 : 1; // retry reads only
    const res = await fetchWithRetry(url, init, attempts);
    if (!res.ok) {
      const text = await res.text().catch(function () { return ""; });
      throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
    }
    return (await res.json()) as T;
    } finally {
    clearTimeout(timeout);
  }
}