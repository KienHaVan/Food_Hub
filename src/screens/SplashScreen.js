import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';

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
