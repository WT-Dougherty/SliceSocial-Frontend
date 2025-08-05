// general
import * as React from 'react'

// navigation and react markups
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import ProfileScreen from '../screens/profile';
import FeedScreen from '../screens/feed';
import AddPostScreen from '../screens/addpost';
import AddFriendsScreen from '../screens/addfriends';
import SettingsScreen from '../screens/settings';

// screen names
const feedName = 'Feed';
const addFriendsName = 'AddFriends';
const addPostName = 'AddPost';
const profileName = 'Profile';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export function NavigationBar() {
    return (
      <Tab.Navigator
      initialRouteName={feedName}
      screenOptions={{
        tabBarActiveTintColor: "grey",
        tabBarInactiveTintColor: "silver",
      }}
      >
        <Tab.Screen name={feedName} component={FeedScreen} />
        <Tab.Screen name={addFriendsName} component={AddFriendsScreen} />
        <Tab.Screen name={addPostName} component={AddPostScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
}