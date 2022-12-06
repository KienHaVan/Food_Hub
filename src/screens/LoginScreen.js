import { yupResolver } from '@hookform/resolvers/yup';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Images } from '../../assets';
import MyInput from '../components/form/MyInput';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import Color from '../constants/Color';
import { addCurrentUser } from '../features/userSlice';
import TextStyles from '../styles/TextStyles';
import { SignInWithEmailAndPassword } from '../utils/authentication';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import AnimatedLoader from 'react-native-animated-loader';

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
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const user = auth()?.currentUser;
    if (user?.email) {
      navigation.navigate('HomeStack');
    }
  }, [navigation]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data) => {
    if (!isValid) return;
    try {
      await SignInWithEmailAndPassword(data.email, data.password);
      dispatch(
        addCurrentUser({
          fullname: auth()?.currentUser?.displayName,
          email: auth()?.currentUser?.email,
          photoURL: auth()?.currentUser?.photoURL,
          id: auth()?.currentUser?.uid,
        })
      );
      Toast.show({
        type: 'success',
        text1: 'Login successfully!',
      });
      navigation.navigate('HomeStack');
    } catch (error) {
      console.log('Error', error);
    }
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
            <ActivityIndicator size={'large'} color={Color.white} />
          )}
        </TouchableOpacity>

        <View style={styles.quote}>
          <Text style={[TextStyles.textMain, styles.bottomQuote]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={[TextStyles.textMain, styles.bottomQuoteLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: scaleSizeUI(30, true) }} />

        <LogWithFacebookAndGoogle text={'Sign in with'} dark setVisible={setVisible} />
      </View>
      {visible && (
        <View style={styles.LoadingGoogleFacebook}>
          {/* <ActivityIndicator size={'large'} color={Color.primary} /> */}
          <AnimatedLoader
            visible={visible}
            overlayColor='rgba(255, 255, 255, 0.2)'
            source={require('../../assets/pizza-loading.json')}
            animationStyle={styles.lottie}
            speed={6}
          />
        </View>
      )}
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoadingGoogleFacebook: {
    position: 'absolute',
    width: 300,
    height: 300,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -100 }],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10000,
  },
  lottie: {
    width: 300,
    height: 300,
    borderRadius: 10000,
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
