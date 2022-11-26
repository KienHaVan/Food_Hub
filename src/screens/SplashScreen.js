import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import { Images } from '../../assets';

const SplashScreen = () => {
  return (
    <View style={[styles.container, LayoutStyles.layoutCenter]}>
      <Image source={Images.IMAGES.SPLASH} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
  },
});
