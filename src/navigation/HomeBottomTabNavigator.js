import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import { CartScreen, HomeScreen } from '../screens';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      style={styles.container}
      defaultScreenOptions={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = Images.ICON.HOME;
          } else if (route.name === 'Cart') {
            iconSource = Images.ICON.CART;
          }
          return <Image source={iconSource} tintColor={color} style={styles.bottom} />;
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.grey,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: scaleSizeUI(74, true) },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Cart' component={CartScreen} />
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;

const styles = StyleSheet.create({
  bottom: {
    width: 28,
    height: 28,
  },
});
