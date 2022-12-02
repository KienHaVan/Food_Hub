import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../assets';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import auth from '@react-native-firebase/auth';
import { addCurrentUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const SplashScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      const user = auth()?.currentUser;
      if (user?.email) {
        dispatch(
          addCurrentUser({
            fullname: user?.displayName,
            email: user?.email,
            photoURL:
              user?.photoURL ||
              'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
            id: user?.uid || user?.id,
          })
        );
        navigation.navigate('HomeStack');
      } else {
        navigation.navigate('Welcome');
      }
    }, 4000);
  }, [dispatch, navigation]);
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
