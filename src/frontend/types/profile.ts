import { DateType, PostType } from "./post"

// DB BlockSize: 8 bytes
// profile ID: 16 char
// username: 24 char
// password: 32 char max
// email: 254 char
export interface ProfileType {
    userID: string,
    username: string,
    password: string,
    birthday: DateType,
    email: string,

    profilePicture?: string,
    bio?: string,

    follows: number,
    follow_list: Array<string>,
};