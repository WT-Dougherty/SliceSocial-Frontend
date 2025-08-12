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
import { NavigationBar } from './navigation/navigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SettingsScreen from './screens/settings';
import Login from './screens/login.tsx';
import CreateAccount from './screens/createAccount.tsx';

const settingsName : string = 'Settings';
const loginName : string = 'Login'
const createAccountName : string = 'CreateAccount'

import { rootNavigationRef } from './navigation/navigationRef.ts';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <React.StrictMode>
      <GestureHandlerRootView style={styles.baseStyling}>
        <NavigationContainer ref={rootNavigationRef}>
          <Stack.Navigator initialRouteName={loginName} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={loginName} component={Login} />
            <Stack.Screen name={createAccountName} component={CreateAccount} />
            <Stack.Screen name={'MainTabs'} component={NavigationBar} />
            <Stack.Screen name={settingsName} component={SettingsScreen} />
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