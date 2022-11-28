import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../constants/Color';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import CornerButton from '../components/CornerButton';
import { useNavigation } from '@react-navigation/native';
import { SignInAnonymously } from '../utils/authentication';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={Images.IMAGES.WELCOME_BACKGROUND} style={styles.container}>
      <LinearGradient colors={['transparent', '#000']} style={styles.gradient}>
        <View>
          <CornerButton
            sourceImage={Images.ICON.ARROW_RIGHT}
            end
            onPress={() => {
              SignInAnonymously();
              navigation.navigate('HomeStack');
            }}
          />
        </View>
        <View style={styles.slogan}>
          <Text style={TextStyles.h1}>
            Welcome to <Text style={styles.sloganAppName}>FoodHub</Text>
          </Text>
          <Text style={[TextStyles.h3, styles.sloganSubHeading]}>
            Your favourite foods delivered fast at your door.
          </Text>
        </View>
        <View style={styles.center}></View>
        <View style={styles.bottom}>
          <LogWithFacebookAndGoogle text={'Sign in with'} />
          <TouchableOpacity
            style={styles.bottomButton}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={[TextStyles.textMain, styles.bottomButtonText]}>
              Start with email or phone
            </Text>
          </TouchableOpacity>
          <View style={styles.quote}>
            <Text style={[TextStyles.textMain, styles.bottomQuote]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[TextStyles.textMain, styles.bottomQuoteLink]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 26,
  },
  slogan: {
    marginTop: 50,
  },
  sloganAppName: {
    color: Color.primary,
  },
  sloganSubHeading: {
    width: 270,
    color: '#30384f',
  },
  center: {
    flex: scaleSizeUI(200, true),
  },
  bottom: {
    flex: scaleSizeUI(250, true),
  },
  bottomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.21)',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 38,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 24,
  },
  bottomButtonText: {
    color: '#fefefe',
    alignSelf: 'center',
  },
  quote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomQuote: {
    color: '#fff',
  },
  bottomQuoteLink: {
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
