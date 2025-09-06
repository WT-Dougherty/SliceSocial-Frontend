import { createNavigationContainerRef } from '@react-navigation/native';
import { CommentType, PostType } from '../types/post';

// tab bar navigation
export const feedName : string = 'Feed';
export const addFriendsName : string = 'AddFriends';
export const addPostName : string = 'Post';
export const profileName : string = 'Profile';

type TabBarNavScreens = {
    [feedName] : undefined,
    [addFriendsName] : undefined,
    [addPostName] : undefined,
    [profileName] : undefined,
};

// root navigation
export type RootNavScreens = {
    'Login' : undefined,
    'CreateAccount' : undefined,
    'MainTabs' : { screen?: keyof TabBarNavScreens; params?: object },
    'Settings' : undefined,
    'SettingsChange' : {
        attribute: string,
        userID: string,
        newValue: string,
    },
    'PostViewer' : {
        post: PostType,
        url: string,
        comments: CommentType[],
    },
};
export const rootNavigationRef = createNavigationContainerRef<RootNavScreens>();