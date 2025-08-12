import { DateType, PostType } from "./post"

export interface ProfileType {
    profileID: string,
    username: string,
    password: string,
    birthday: DateType,
    email: string,

    profilePicture?: string,
    bio?: string,

    followers: Array<string>,
    following: Array<string>,
    followerCount: number,
    followingCount: number,

    posts: Array<string>,
};