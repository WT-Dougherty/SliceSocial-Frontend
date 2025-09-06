import { request } from "../lib/http"

// type imports
import { HttpMethod, RequestOptions } from "../types/request"
import { PostType } from "../../../types/post";

export async function apiGetUserPosts(userID : string) : Promise<PostType[]> {
    let getErr: unknown;
    const requestOptions : RequestOptions = {
        method: "GET" as HttpMethod,
        path: "/posts/",
        query: {'userID': userID},
    }
    
    const response = await request(requestOptions)
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`GET /posts/ failed: ${response.status} ${response.statusText} ${text}`);
    }
    
    const data = (await response.json()) as PostType[];
    console.log("Posts Fetched. Posts Array: ", data);
    return data;

    
}

function parseAsUTC(s: string): Date {
  const [d, t] = s.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm, ss] = t.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, day, hh, mm, ss));
}