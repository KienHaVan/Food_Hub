import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import { Images } from '../../assets';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1000);
  }, []);

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
