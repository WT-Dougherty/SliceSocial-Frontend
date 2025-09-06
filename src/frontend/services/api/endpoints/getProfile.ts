import { request } from "../lib/http"

// type imports
import { HttpMethod, RequestOptions } from "../types/request"
import { ProfileType } from "../../../types/profile";

export async function apiGetProfile(userID : string) : Promise<ProfileType> {
    let getErr: unknown;
    const requestOptions : RequestOptions = {
        method: "GET" as HttpMethod,
        path: "/users/",
        query: {'userID': userID},
    }
    
    const response = await request(requestOptions)
    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`GET /users/ failed: ${response.status} ${response.statusText} ${text}`);
    }
    const data = (await response.json()) as ProfileType;
    console.log("Profile Fetched");
    return data;

    
}