import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  FoodDetailScreen,
  LoginScreen,
  SignUpScreen,
  SplashScreen,
  WelcomeScreen,
  EditProfileScreen,
  ProfileScreen,
  SearchScreen,
} from '../screens';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

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
      <Stack.Screen name='Search' component={SearchScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
