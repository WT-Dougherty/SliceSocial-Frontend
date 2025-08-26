import { setAccessToken } from "../../auth/keychain"
import { request } from "../lib/http"

// type imports
import { HttpMethod } from "../lib/http"
import { ProfileType } from "../../../types/profile"

export function createProfile(userProfile : ProfileType) {
    const requestOptions = {
        method: "POST" as HttpMethod,
        path: "/users/create",
        body: userProfile,
    }
    let jwtString;
    request(requestOptions)
    .then()
}