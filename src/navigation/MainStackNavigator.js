import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  FoodDetailScreen,
  RestaurantDetailScreen,
  LoginScreen,
  SignUpScreen,
  SplashScreen,
  WelcomeScreen,
  EditProfileScreen,
  ProfileScreen,
  SearchScreen,
} from '../screens';
import AddCreditCard from '../screens/AddCreditCard';
import CheckoutOrderScreen from '../screens/CheckoutOrderScreen';
import CheckoutPaymentScreen from '../screens/CheckoutPaymentScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ManageCreditCard from '../screens/ManageCreditCard';
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
      <Stack.Screen name='RestaurantDetail' component={RestaurantDetailScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
      <Stack.Screen name='EditProfile' component={EditProfileScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Stack.Screen name='TestFirestore' component={TestFirestore} />
      <Stack.Screen name='Rating' component={RatingScreen} />
      <Stack.Screen name='Review' component={ReviewScreen} />
      <Stack.Screen name='ManageCreditCard' component={ManageCreditCard} />
      <Stack.Screen name='AddCreditCard' component={AddCreditCard} />
      <Stack.Screen name='CheckoutPayment' component={CheckoutPaymentScreen} />
      <Stack.Screen name='CheckoutOrder' component={CheckoutOrderScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
