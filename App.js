import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appearance, useColorScheme, AppearanceProvider, Text } from 'react-native-appearance';
import scannedFood from './src/pages/scannedFood'
import HomeScreen from './src/pages/home'
import CameraScreen from './src/pages/camera'
import LoginScreen from './src/components/login'
import UserScreen from './src/components/user'
import RegisterScreen from './src/pages/register'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import { AuthContext } from "./src/components/context";
import splashScreen from './src/components/splash'
import FlashMessage from "react-native-flash-message";
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  View,
  ScreenContainer
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

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem('userToken');
        response = await axios.get('http://192.168.1.72:8080/getUser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.data.user._id) token = null;
      } catch (e) {
        await AsyncStorage.removeItem('userToken')
        token = null
      }
      dispatch({ type: 'RESTORE_TOKEN', token: token })
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        let response = ''
        try {
          response = await axios.post('http://192.168.1.72:8080/login', { email: data.email, password: data.password })
          await AsyncStorage.setItem('userToken', response.data.token)
          dispatch({ type: 'SIGN_IN', token: response.data.token });
        } catch (e) {
          console.log(e.response.data)
        }
      },
      signOut: async () => {
        try {
          const token = await AsyncStorage.getItem('userToken')
          await axios.get('http://192.168.1.72:8080/logout', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          await AsyncStorage.removeItem('userToken')
        } catch (e) {
          console.log(e)
        }
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );
  if (state.isLoading) {
    return splashScreen()
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken != null ? (createBottomTabs()) : (AuthStackScreen())}
      </NavigationContainer>
      <FlashMessage position="top" />
    </AuthContext.Provider>
  )
}