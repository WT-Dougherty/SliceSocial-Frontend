import * as Keychain from "react-native-keychain";

export async function getAccessToken(): Promise<string | null> {
  const creds = await Keychain.getGenericPassword({ service: "access-token" });
  return creds ? creds.password : null;
}

export async function setAccessToken(token: string): Promise<void> {
  await Keychain.setGenericPassword("token", token, { service: "access-token" });
}

export async function clearAccessToken(): Promise<void> {
  await Keychain.resetGenericPassword({ service: "access-token" });
}

export async function getUserID(jwt : string): Promise<string> {
  const userID = jwt.split('.')[1];
  return userID ? JSON.parse(atob(userID)).sub : "NOIDFOUND";
}