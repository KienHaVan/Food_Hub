import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Images } from '../../assets';
import CustomButton from '../components/CustomButton';

const LoginScreen = () => {
  return (
    <View style={{ height: 60, alignSelf: 'center', marginTop: 30 }}>
      <CustomButton text={'Click here!'} isPrimary />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
