import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const handleResetPassword = async () => {
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
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Check your email to reset password!',
          });
          navigation.navigate('Login');
        })
        .catch((err) => {
          switch (err.code) {
            case 'auth/network-request-failed':
              Toast.show({
                type: 'error',
                text1: 'Check your internet connection',
              });
              break;
            case 'auth/too-many-requests':
              Toast.show({
                type: 'error',
                text1: 'Try Again',
              });
              break;
            default:
              console.log(err);
              Toast.show({
                type: 'error',
                text1: 'Try Again',
              });
              break;
          }
        });
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
          <View style={[styles.button, styles.cancelButton]}>
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
  cancelButton: { width: 160, alignSelf: 'center' },
});
