import React from 'react';
import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
  WelcomeScreen,
  FoodDetailScreen,
} from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import TestFirestore from '../screens/TestFirestore';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='HomeStack'
      defaultScreenOptions={'Splash'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='HomeStack' component={HomeBottomTabNavigator} />
      <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='TestFirestore' component={TestFirestore} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
