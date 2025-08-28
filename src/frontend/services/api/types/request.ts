export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RequestOptions {
  method: HttpMethod;
  path: string;
  query?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  signal?: AbortSignal;
  auth?: boolean;
  headers?: Record<string, string>;
}