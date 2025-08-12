// general
import { StyleSheet } from 'react-native';
import * as React from 'react'
import { BlurView } from '@react-native-community/blur';

// navigation and react markups
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icons
import FeedIcon from '../assets/icons/FeedIcon.svg';
import AddFriendsIcon from '../assets/icons/AddFriendsIcon.svg';
import AddPostIcon from '../assets/icons/AddPostIcon.svg';
import ProfileIcon from '../assets/icons/ProfileIcon.tsx';

// screens
import FeedScreen from '../screens/feed';
import AddFriendsScreen from '../screens/addfriends';
import AddPostScreen from '../screens/addpost';
import ProfileScreen from '../screens/profile';

// screen names
import { feedName } from './navigationRef.ts';
import { addFriendsName } from './navigationRef.ts';
import { addPostName } from './navigationRef.ts';
import { profileName } from './navigationRef.ts';

const Tab = createBottomTabNavigator();

export function NavigationBar() {
  const ProfilePhoto: string = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
    return (
      <Tab.Navigator
      initialRouteName={feedName}
      screenOptions={({route}) => ({
        header: () => <AppHeader />,
        headerShown: true,
        headerTransparent: true,
        tabBarShowLabel: false,
        tabBarIconStyle: {marginTop: 8},
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
              return <ProfileIcon width={size} clr={color} photoUri={ProfilePhoto} />;
          }
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <BlurView blurType="materialLight" style={styles.bars} />
        ),
      })}
      >
        <Tab.Screen name={feedName} component={FeedScreen} />
        <Tab.Screen name={addFriendsName} component={AddFriendsScreen} />
        <Tab.Screen name={addPostName} component={AddPostScreen} />
        <Tab.Screen name={profileName} component={ProfileScreen} />
      </Tab.Navigator>
    );
}

function AppHeader() {
  return (
    <BlurView blurType='materialLight' style={styles.bars} >
    </BlurView>
  )
}

const styles = StyleSheet.create({
  bars: {
    flex: 1,
    backgroundColor: 'rgba(77, 77, 77, 0.37)',
    height: 80,
    borderBottomWidth: 0,
  },
})