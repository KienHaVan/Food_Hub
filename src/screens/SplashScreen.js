import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import auth from '@react-native-firebase/auth';
import { addCurrentUser } from '../features/userSlice';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 4000);
  }, [navigation]);
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      addCurrentUser({
        fullname: user?.displayName,
        email: user?.email,
        id: user?.uid,
      });
    });
  }, []);
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
