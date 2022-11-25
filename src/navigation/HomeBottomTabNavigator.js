import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, LoginScreen } from '../screens';
import Color from '../constants/Color';
import { Images } from '../../assets';

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      defaultScreenOptions={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = Images.ICON.HOME;
          } else if (route.name === 'Map') {
            iconSource = Images.ICON.MAP;
          }
          return <Image source={iconSource} tintColor={color} />;
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.grey,
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      {/* <Tab.Screen name='Map' component={LoginScreen} /> */}
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;
