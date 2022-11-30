import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen, SignUpScreen, SplashScreen, WelcomeScreen } from '../screens';
import EditProfileScreen from '../screens/EditProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestFirestore from '../screens/TestFirestore';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Splash'
      defaultScreenOptions={'Splash'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='HomeStack' component={HomeBottomTabNavigator} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='TestFirestore' component={TestFirestore} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
