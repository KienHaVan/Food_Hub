import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import LogWithFacebookAndGoogle from '../components/LogWithFacebookAndGoogle';
import Color from '../constants/Color';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import Toast from 'react-native-toast-message';
import AnimatedLoader from 'react-native-animated-loader';
const WelcomeScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const handleSignInAnonymously = () => {
    setVisible(true);
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
        navigation.navigate('HomeStack');
        setVisible(false);
      })
      .catch((error) => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        } else if (error.code === 'auth/network-request-failed') {
          console.log('Check your internet connection');
          Toast.show({
            type: 'info',
            text1: 'Check your internet connection',
          });
        } else {
          console.log(error);
        }
      });
  };
  return (
    <ImageBackground source={Images.IMAGES.WELCOME_BACKGROUND} style={styles.container}>
      <LinearGradient colors={['transparent', '#000']} style={styles.gradient}>
        <View style={styles.headingButton}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            style={styles.iconFlip}
            handlePress={handleSignInAnonymously}
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
        <View style={styles.center} />
        <View style={styles.bottom}>
          <LogWithFacebookAndGoogle text={'Sign in with'} setVisible={setVisible} />
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
        {visible && (
          <View style={styles.LoadingGoogleFacebook}>
            {/* <ActivityIndicator size={'large'} color={Color.primary} /> */}
            <AnimatedLoader
              visible={visible}
              overlayColor='rgba(255, 255, 255, 0.2)'
              source={require('../../assets/loader2.json')}
              animationStyle={styles.lottie}
              speed={1}
            />
          </View>
        )}
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  LoadingGoogleFacebook: {
    position: 'absolute',
    width: 600,
    height: 600,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -100 }],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10000,
  },
  lottie: {
    width: 600,
    height: 600,
    borderRadius: 10000,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 26,
  },
  headingButton: {
    alignSelf: 'flex-end',
  },
  slogan: {
    marginTop: 50,
  },
  iconFlip: {
    transform: [{ scale: -1 }],
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
