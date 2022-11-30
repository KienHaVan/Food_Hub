import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Color from '../constants/Color';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import CornerButton from '../components/CornerButton';
import { useNavigation } from '@react-navigation/native';
import { passwordReset } from '../utils/authentication';
import Toast from 'react-native-toast-message';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email!');
      return;
    } else if (
      email
        .toString()
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      passwordReset(email);
      Toast.show({
        type: 'success',
        text1: 'Check your email to reset password!',
      });
      navigation.navigate('Login');
    } else {
      setError('Invalid email');
    }
  };
  return (
    <KeyBoardAvoidingWaraper>
      <View style={styles.container}>
        <ImageBackground
          source={Images.IMAGES.FORGET_PASSWORD_BGC}
          resizeMode='cover'
          style={styles.heading}
        />
        <View style={styles.content}>
          <Text style={[TextStyles.h2, styles.contentSpacing]}>FORGET PASSWORD</Text>
          <InputField
            label={'Email ID'}
            placeholder={'Enter your email...'}
            onChangeText={(newText) => setEmail(newText)}
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <View style={styles.button}>
            <CustomButton text='Send Request' onPress={handleResetPassword} />
          </View>
          <View style={[styles.button, { width: 160, alignSelf: 'center' }]}>
            <CustomButton
              text='Cancel'
              isPrimary={false}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>
        <View style={styles.backButton}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </KeyBoardAvoidingWaraper>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101940',
    position: 'relative',
  },
  heading: {
    height: scaleSizeUI(300, true),
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    paddingVertical: 66,
  },
  contentSpacing: {
    marginBottom: 50,
  },
  button: {
    height: 60,
    marginTop: 30,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  error: {
    color: 'red',
    marginTop: 2,
  },
});
