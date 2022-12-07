import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import { Images } from '../../assets';
import MyInput from '../components/form/MyInput';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import Color from '../constants/Color';
import { addCurrentUser } from '../features/userSlice';
import TextStyles from '../styles/TextStyles';
import {
  addUserToFirebase,
  addUserToFirebaseWithID,
  SignUpWithEmailAndPassword,
} from '../utils/authentication';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';

const schema = yup
  .object({
    fullname: yup
      .string()
      .required('Please insert your name')
      .max(20, 'Your name should be 20 charaters or less'),
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
const SignUpScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
    if (!isValid) {
      return;
    }
    await auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(async () => {
        console.log('User account created & signed in!');
        await auth().currentUser.updateProfile({
          displayName: data.fullname,
          photoURL:
            'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        });
        await addUserToFirebaseWithID(
          {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
            photoURL:
              'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
          },
          auth()?.currentUser?.uid
        );
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
          text1: 'Create user successfully',
        });
        navigation.navigate('HomeStack');
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/network-request-failed':
            Toast.show({
              type: 'error',
              text1: 'Check your internet connection',
            });
            break;
          case 'auth/email-already-in-use':
            Toast.show({
              type: 'error',
              text1: 'Please try onther email',
            });
            break;
          case 'auth/too-many-requests':
            Toast.show({
              type: 'error',
              text1: 'Try Again',
            });
            break;
          default:
            console.log(error);
            Toast.show({
              type: 'error',
              text1: 'Try Again',
            });
            break;
        }
      });
  };
  return (
    <ImageBackground
      source={Images.IMAGES.LOGIN_BACKGROUND}
      style={styles.container}
      resizeMode='stretch'
    >
      <View style={styles.heading} />
      <View style={styles.content}>
        <Text style={TextStyles.h1}>Sign Up</Text>

        <View style={styles.inputField}>
          <Text style={TextStyles.textMain}>Full name</Text>
          <MyInput control={control} placeholder='Enter your full name' name='fullname' />
        </View>
        {errors?.fullname && <Text style={styles.error}>{errors?.fullname?.message}</Text>}

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

        <View style={styles.center} />

        <TouchableOpacity
          disabled={isSubmitting}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          {!isSubmitting ? (
            <Text style={styles.signupButtonText}>SIGN UP</Text>
          ) : (
            <ActivityIndicator size={'large'} color={Color.white} />
          )}
        </TouchableOpacity>

        <View style={styles.quote}>
          <Text style={[TextStyles.textMain, styles.bottomQuote]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[TextStyles.textMain, styles.bottomQuoteLink]}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: scaleSizeUI(30, true) }} />

        <LogWithFacebookAndGoogle text={'Sign up with'} dark setVisible={setVisible} />
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

export default SignUpScreen;

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
    flex: scaleSizeUI(50, true),
  },
  content: {
    flex: scaleSizeUI(700, true),
    marginHorizontal: 26,
  },
  center: {
    height: scaleSizeUI(30, true),
  },
  quote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomQuote: {
    color: Color.gray,
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
