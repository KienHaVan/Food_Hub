import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SplashScreen } from '../screens';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeBottomTabNavigator from './HomeBottomTabNavigator';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator defaultScreenOptions={'HomeStack'} screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeStack' component={HomeBottomTabNavigator} />
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name='Welcome' component={WelcomeScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
