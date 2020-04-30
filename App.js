import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appearance, useColorScheme, AppearanceProvider } from 'react-native-appearance';
import scannedFood from './src/pages/scannedFood'
import HomeScreen from './src/pages/home'
import CameraScreen from './src/pages/camera'
import LoginScreen from './src/components/login'
import UserScreen from './src/components/user'
import RegisterScreen from './src/pages/register'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';




const createCameraStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="CameraScreen" component={CameraScreen} />
    <Stack.Screen name="scannedFood" component={scannedFood} />
  </Stack.Navigator>
);


const createBottomTabs = () => (
  <BottomTab.Navigator>
    <BottomTab.Screen name="Home" component={HomeScreen}
      options={{
        tabBarIcon: () => (
          <Icon style={[{ color: 'white' }]} size={25} name={'human'} />
        )
      }} />
    <BottomTab.Screen name="Camera" children={createCameraStack} />
    <BottomTab.Screen name="Felhasználó" component={UserScreen} />
  </BottomTab.Navigator >
)

const AuthStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bejelentkezés" component={LoginScreen} />
    <Stack.Screen name="Regisztráció" component={RegisterScreen} />
  </Stack.Navigator>
)


export default App = () => {
  const [user, setUser] = React.useState(null)

  async function checkToken() {
    let token = ''
    try {
      token = await AsyncStorage.getItem('token')
    } catch (e) {
      console.log(e)
    }

    if (!token) {
      setUser(null)
    } else {
      await axios.get('http://192.168.1.72:8080/getUser', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((data) => {
        setUser(data.data.user)
      }).catch(e => {
        console.log(e.response.data)
      })
    }
  }

  React.useEffect(() => {
    checkToken()
  }, [])
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
  return (
    <AppearanceProvider>
      <NavigationContainer theme={colorScheme == 'dark' ? DarkTheme : MyTheme}>
        {user ? (
          createBottomTabs()
        ) : (
            AuthStackScreen())}
      </NavigationContainer>
    </AppearanceProvider >
  )
}