import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1000);
  }, [navigation]);

  return (
    <View style={[styles.container, LayoutStyles.layoutCenter]}>
      <Image source={Images.IMAGES.SPLASH} style={styles.logo} resizeMode='contain' />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    alignSelf: 'center',
  },
});
