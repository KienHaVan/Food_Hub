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
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RatingScreen from '../screens/RatingScreen';
import ReviewScreen from '../screens/ReviewScreen';
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
      <Stack.Screen name='FoodDetail' component={FoodDetailScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='TestFirestore' component={TestFirestore} />
      <Stack.Screen name='Rating' component={RatingScreen} />
      <Stack.Screen name='Review' component={ReviewScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
