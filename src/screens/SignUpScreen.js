import { Button, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import TextStyles from '../styles/TextStyles';
import Color from '../constants/Color';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import MyInput from '../components/form/MyInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const SignUpScreen = () => {
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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = (data) => console.log(data);
  return (
    <ImageBackground
      source={Images.IMAGES.LOGIN_BACKGROUND}
      style={styles.container}
      resizeMode='stretch'
    >
      <View style={styles.heading}></View>
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
          <MyInput control={control} placeholder='Enter your password' name='password' />
        </View>
        {errors?.password && <Text style={styles.error}>{errors?.password?.message}</Text>}

        <View style={{ height: scaleSizeUI(30, true) }}></View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 24,
              lineHeight: 30,
              color: '#fff',
              alignSelf: 'center',
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        <View style={styles.quote}>
          <Text style={[TextStyles.textMain, styles.bottomQuote]}>Already have an account? </Text>
          <TouchableOpacity>
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
  quote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomQuote: {
    color: Color.secondary,
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
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
});
