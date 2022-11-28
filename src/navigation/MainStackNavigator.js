import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen, SignUpScreen, SplashScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator defaultScreenOptions={'Splash'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='HomeStack' component={HomeBottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
