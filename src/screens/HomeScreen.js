import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';

import HomeHeader from '../modules/Home/HomeHeader';

import InputField from '../components/InputField';

const LoginScreen = () => {
  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <HomeHeader />
      <Text style={[TextStyles.h2, styles.screenHeading]}>What would you like to order</Text>

      <InputField
        placeholder='Find for food or restaurant...'
        isPassword={false}
        preIcon={<Image source={require('../../assets/icons/icon_search.png')} />}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeLargeH,
    paddingHorizontal: Sizes.sizeBig,
  },
  screenHeading: {
    width: '80%',
    marginBottom: Sizes.sizeBig,
  },
});
