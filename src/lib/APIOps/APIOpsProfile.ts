import * as React from 'react'

// type imports
import { ProfileType } from '../../types/profile'

// API endpoints
const INVOKE_URL = 'https://xsqio3ul1k.execute-api.us-east-2.amazonaws.com/development/userprofiles';

// HTTP POST sent to /userprofiles
export async function APICreateProfile(newProfile : ProfileType) {
    let response : Response;
    try{
    response = await fetch(INVOKE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfile),
    });
    console.log("API POST status: ", response.status);
    } catch(err) {
        console.error("API POST Failed. Error Code: ", err);
        return "Status: failure";
    }
    return "Status: success";
}