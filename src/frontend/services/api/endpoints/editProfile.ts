import { request } from "../lib/http"
import { Alert } from "react-native"

// type imports
import { HttpMethod, RequestOptions } from "../types/request"
import { EmptyProfile, ProfileType } from "../../../types/profile";

export async function apiEditProfile(
  userID: string,
  patch: Partial<ProfileType>,
  setError: React.Dispatch<React.SetStateAction<string>>
): Promise<number> {
  const res = await request({
    method: "PATCH",
    path: `/users/?userID=${encodeURIComponent(userID)}`,
    body: patch,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 409) {
        setError("Username Is Taken!");
    }
    return res.status;
  }
  else {
    console.log("Successful PATCH")
    return res.status;
  }
}