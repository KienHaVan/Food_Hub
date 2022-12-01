import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextStyles from '../styles/TextStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MyInput from '../components/form/MyInput';
import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import Color from '../constants/Color';
import { useNavigation } from '@react-navigation/native';
import { resetPassword, SignInWithEmailAndPassword } from '../utils/authentication';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';

const schema = yup
  .object({
    email: yup
      .string()
      .lowercase()
      .required('Please insert your email')
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Enter the valid email'
      ),
    password: yup
      .string()
      .required('Please insert your password')
      .min(6, 'Password length should be at least 6 characters')
      .max(20, 'Password cannot exceed more than 20 characters'),
  })
  .required();
const LoginScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (currentUser?.email) {
      navigation.navigate('HomeStack');
    }
  }, [currentUser?.email, navigation]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data) => {
    if (!isValid) return;
    SignInWithEmailAndPassword(data.email, data.password);
    Toast.show({
      type: 'success',
      text1: 'Login successfully',
    });
    navigation.navigate('HomeStack');
  };
  const hanleResetPassword = () => {
    resetPassword();
  };
  return (
    <ImageBackground
      source={Images.IMAGES.LOGIN_BACKGROUND}
      style={styles.container}
      resizeMode='stretch'
    >
      <View style={styles.heading} />
      <View style={styles.content}>
        <Text style={TextStyles.h1}>Login</Text>

        <View style={styles.inputField}>
          <Text style={TextStyles.textMain}>E-mail</Text>
          <MyInput control={control} placeholder='Enter your email address' name='email' />
        </View>
        {errors?.email && <Text style={styles.error}>{errors?.email?.message}</Text>}

        <View style={styles.inputField}>
          <Text style={TextStyles.textMain}>Password</Text>
          <MyInput control={control} placeholder='Enter your password' name='password' isPassword />
        </View>
        {errors?.password && <Text style={styles.error}>{errors?.password?.message}</Text>}

        <View style={styles.center}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[TextStyles.textMain, styles.centerText]}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          {!isSubmitting ? (
            <Text style={styles.signupButtonText}>LOGIN</Text>
          ) : (
            <ActivityIndicator size={'large'} color={Color.white}></ActivityIndicator>
          )}
        </TouchableOpacity>

        <View style={styles.quote}>
          <Text style={[TextStyles.textMain, styles.bottomQuote]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[TextStyles.textMain, styles.bottomQuoteLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: scaleSizeUI(30, true) }} />

        <LogWithFacebookAndGoogle text={'Sign in with'} dark />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    flex: scaleSizeUI(100, true),
  },
  content: {
    flex: scaleSizeUI(700, true),
    marginHorizontal: 26,
  },
  center: {
    marginVertical: scaleSizeUI(30, true),
  },
  centerText: {
    color: Color.primary,
    alignSelf: 'center',
    fontWeight: '600',
  },
  quote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomQuote: {
    color: Color.grey,
  },
  bottomQuoteLink: {
    textDecorationLine: 'underline',
    color: Color.primary,
  },
  inputField: {
    marginTop: scaleSizeUI(24, true),
  },
  error: {
    color: 'red',
    marginTop: 2,
  },
  button: {
    width: 280,
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 60,
    backgroundColor: Color.primary,
    borderRadius: 28,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  signupButtonText: [
    TextStyles.h3,
    {
      color: Color.white,
    },
  ],
});
