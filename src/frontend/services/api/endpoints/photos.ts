import { request } from "../lib/http"

// type imports
import { HttpMethod, RequestOptions } from "../types/request"

export async function apiGetProPic(userID : string) : Promise<string> {
    const requestOptions : RequestOptions = {
        method: "GET" as HttpMethod,
        path: "/images/propic",
        query: {'userID': userID},
    }
    
    const response = await request(requestOptions)
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`GET /users/propic failed: ${response.status} ${response.statusText} ${text}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}

export async function apiGetPostPhoto(postID : string) : Promise<string> {
    const requestOptions : RequestOptions = {
        method: "GET" as HttpMethod,
        path: "/images/post",
        query: {'postID': postID},
    }
    
    const response = await request(requestOptions)
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`GET /users/propic failed: ${response.status} ${response.statusText} ${text}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}