import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';
import scannedFood from './src/pages/scannedFood'
import HomeScreen from './src/pages/home'
import CameraScreen from './src/pages/camera'
import LoginScreen from './src/pages/login'

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';

export default App = () => {

  const colorScheme = useColorScheme();

  const MyTheme = {
    dark: false,
    colors: {
      primary: 'white',
      background: 'white',
      card: 'gray',
      text: 'white',
      border: 'green',
    },
  }

  createCameraStack = () => {
    return <Stack.Navigator>
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="scannedFood" component={scannedFood} />
    </Stack.Navigator>
  }

  createBottomTabs = () => {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen name="Home" component={HomeScreen}
          options={{
            tabBarIcon: () => (
              <Icon style={[{ color: 'white' }]} size={25} name={'human'} />
            )
          }} />
        <BottomTab.Screen name="Camera" children={this.createCameraStack} />
        <BottomTab.Screen name="Login" component={LoginScreen} />
      </BottomTab.Navigator >
    )
  }

  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}>
        {this.createBottomTabs()}
      </NavigationContainer>
    </AppearanceProvider >
  )
}