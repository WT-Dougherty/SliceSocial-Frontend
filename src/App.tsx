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
const settingsName : string = 'Settings';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <React.StrictMode>
      <GestureHandlerRootView style={styles.baseStyling}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Main Tabs'} component={NavigationBar} />
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