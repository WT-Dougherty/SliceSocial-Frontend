import { setAccessToken } from "../../auth/keychain"
import { rootNavigationRef } from "../../../navigation/navigationRef"
import { request } from "../lib/http"
import { Alert } from "react-native"

// type imports
import { HttpMethod, RequestOptions } from "../types/request"
import { TokenBody } from "../types/response"
import { ProfileType } from "../../../types/profile"

export async function apiCreateAccount(
    userProfile : ProfileType,
    setError : React.Dispatch<React.SetStateAction<string>>)
{
    const requestOptions : RequestOptions = {
        method: "POST" as HttpMethod,
        path: "/users/create",
        body: userProfile,
    }
    try {
        request(requestOptions)
        .then(async response => {
            const res = await response.json();
            if (!response.ok) { setError(res.detail); }
            else {
                const tokenBody : TokenBody = res;
                setAccessToken(tokenBody.access_token);
                rootNavigationRef.navigate('MainTabs', { screen: 'Profile' });
            }
        }).catch(e => console.log(e));
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message); // Safely access message property
        } else if (typeof err === 'string') {
            console.error(err); // Handle string errors
        } else {
            console.error("An unknown error occurred.");
        }
        Alert.alert("Something went wrong. Please try again later.");
    }
}