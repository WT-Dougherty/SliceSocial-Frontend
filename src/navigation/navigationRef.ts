import { createNavigationContainerRef } from '@react-navigation/native';

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
type RootNavScreens = {
    'Login' : undefined,
    'CreateAccount' : undefined,
    'MainTabs' : { screen?: keyof TabBarNavScreens; params?: object },
    'Settings' : undefined,
};
export const rootNavigationRef = createNavigationContainerRef<RootNavScreens>();