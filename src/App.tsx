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

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import SettingsScreen from './screens/settings';
const settingsName : string = 'Settings';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'Main Tabs'} component={NavigationBar} />
        <Stack.Screen name={settingsName} component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screens: {
    color: "black",
    justifyContent: "center",
  }
});

export default App;