import { API_BASE_URL, REQUEST_TIMEOUT_MS } from "../../config";
import { getAccessToken } from "../../auth/keychain";
import { RequestOptions } from "../types/request";

// this function is used to generate a request given passed request options
//    it returns a promise of a response
export async function request(opts: RequestOptions): Promise<Response> {
  const url = buildUrl(opts.path, opts.query);

  // set headers
  const headers: Record<string, string> = {
    "Accept": "application/json",
    ...(opts.body ? { "Content-Type": "application/json" } : {}),
    ...(opts.headers ?? {}),
  };

  // add client's authentication token
  if (opts.auth) {
    const token = await getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  };

  // set request timeout
  const controller = new AbortController();
  const timeout = setTimeout(function () {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  const request = new Request(url, {
    headers: headers,
    method: opts.method,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    signal: opts.signal ?? controller.signal,
  })
  const attempts = opts.method === "GET" ? 3 : 1; // retry reads only
  return (await fetchWithRetry(request, attempts, timeout));
}

// fetch to input (url) with init (request options) attempts times
async function fetchWithRetry(request: Request, attempts: number, timeout: NodeJS.Timeout): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(request);
      if (res.status >= 500 && i < attempts - 1) {
        await sleep(200 * Math.pow(2, i));
        continue;
      }
      clearTimeout(timeout)
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


// helper functions...
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