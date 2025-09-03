//
//
// Slice Social
// 
//
// by Will Dougherty
//
import * as React from 'react'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationBar } from './frontend/navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavScreens } from './frontend/navigation/navigationRef';

import SettingsScreen from './frontend/screens/settings';
import Login from './frontend/screens/login.tsx';
import CreateAccount from './frontend/screens/createAccount.tsx';
import SettingsChange from './frontend/screens/settingsChange.tsx';

import { rootNavigationRef } from './frontend/navigation/navigationRef.ts';
const Stack = createNativeStackNavigator<RootNavScreens>();

function App() {
  return (
    <React.StrictMode>
      <GestureHandlerRootView style={styles.baseStyling}>
        <NavigationContainer ref={rootNavigationRef}>
          <Stack.Navigator initialRouteName={'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Login'} component={Login} />
            <Stack.Screen name={'CreateAccount'} component={CreateAccount} />
            <Stack.Screen name={'MainTabs'} component={NavigationBar} />
            <Stack.Screen name={'Settings'} component={SettingsScreen} />
            <Stack.Screen name={'SettingsChange'} component={SettingsChange} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  screens: {
    color: "black",
    justifyContent: "center",
  },
  baseStyling: {
    flex: 1,
    fontFamily: "HelveticaNeue-Medium"
  }
});

export default App;