import * as React from 'react'

// type imports
import { ProfileType } from '../frontend/types/profile'

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

// HTTP GET sent to /userprofiles
export async function API_GET(userID : string) {
  const API_BASE_URL = 'https://pdckckk8kf.execute-api.us-east-1.amazonaws.com/CRUDOps/Schedules';
  let data;

  try{
    const response = await fetch( `${API_BASE_URL}?username=${userID}` )
    data = await response.json()
    console.log("API GET Successful. Data: ", data);
  } catch(err) {
    console.error("API GET Failed. Error Code: ", err);
  }

  return data;
}