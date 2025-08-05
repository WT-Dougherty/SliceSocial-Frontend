// general
import * as React from 'react'

// navigation and react markups
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import FeedIcon from '../assets/icons/FeedIcon.svg'
import AddFriendsIcon from '../assets/icons/AddFriendsIcon.svg'
import AddPostIcon from '../assets/icons/AddPostIcon.svg'
import ProfileIcon from '../assets/icons/ProfileIcon.svg'

// screens
import FeedScreen from '../screens/feed';
import AddFriendsScreen from '../screens/addfriends';
import AddPostScreen from '../screens/addpost';
import ProfileScreen from '../screens/profile';

// screen names
const feedName = 'Feed';
const addFriendsName = 'Add Friends';
const addPostName = 'Post';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export function NavigationBar() {
    return (
      <Tab.Navigator
      initialRouteName={feedName}
      screenOptions={({route}) => ({
        headerShown: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarIcon: ({ color, size }) => {
          const iconProps = { width: size, height: size, color: color }
          switch (route.name) {
            case feedName:
              return <FeedIcon {...iconProps} />;
            case addFriendsName:
              return <AddFriendsIcon {...iconProps} />;
            case addPostName:
              return <AddPostIcon {...iconProps} />;
            case profileName:
              return <ProfileIcon {...iconProps} />;
          }
        }
      })}
      >
        <Tab.Screen name={feedName} component={FeedScreen} />
        <Tab.Screen name={addFriendsName} component={AddFriendsScreen} />
        <Tab.Screen name={addPostName} component={AddPostScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
}