import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import { CartScreen, HomeScreen } from '../screens';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import LocationScreen from '../screens/LocationScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import NotificationScreen from '../screens/NotificationScreen';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Color';
import OrderScreen from '../screens/OrderScreen';

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <Tab.Navigator
      style={styles.container}
      defaultScreenOptions={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconSource;
          if (route.name === 'Home') {
            iconSource = Images.ICON.COMPASS;
          } else if (route.name === 'Billing') {
            iconSource = Images.ICON.BILL;
          } else if (route.name === 'Cart') {
            iconSource = Images.ICON.CART_BOTTOM;
          } else if (route.name === 'Favorite') {
            iconSource = Images.ICON.HEART_BOTTOM;
          } else if (route.name === 'Notification') {
            iconSource = Images.ICON.BELL;
          }
          return <Image source={iconSource} tintColor={color} style={styles.bottom} />;
        },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.grey,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: scaleSizeUI(60, true) },
      })}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Billing' component={OrderScreen} />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          tabBarBadge: cartQuantity,
          tabBarBadgeStyle: { backgroundColor: Colors.primary, color: Colors.white },
        }}
      />
      <Tab.Screen name='Favorite' component={FavoriteScreen} />
      {/* <Tab.Screen name='Notification' component={NotificationScreen} /> */}
    </Tab.Navigator>
  );
};

export default HomeBottomTabNavigator;

const styles = StyleSheet.create({
  bottom: {
    width: 32,
    height: 32,
  },
});
