import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
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
  useEffect(() => {
    const user = auth()?.currentUser;
    if (user?.email) {
      dispatch(
        addCurrentUser({
          fullname: user.displayName,
          email: user.email,
          id: user.uid,
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = async (data) => {
    if (!isValid) {
      return;
    }
    await SignUpWithEmailAndPassword(data.email, data.password);
    await auth().currentUser.updateProfile({
      displayName: data.fullname,
      avatarURL:
        'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    });
    await addUserToFirebaseWithID(
      {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
        avatarURL:
          'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
      },
      auth()?.currentUser?.uid
    );
    Toast.show({
      type: 'success',
      text1: 'Create user successfully',
    });
    navigation.navigate('HomeStack');
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
            <ActivityIndicator size={'large'} color={Color.white}></ActivityIndicator>
          )}
        </TouchableOpacity>

        <View style={styles.quote}>
          <Text style={[TextStyles.textMain, styles.bottomQuote]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[TextStyles.textMain, styles.bottomQuoteLink]}>Login</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: scaleSizeUI(30, true) }} />

        <LogWithFacebookAndGoogle text={'Sign up with'} dark />
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
