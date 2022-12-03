import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import Layout from '../styles/Layout';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { useDispatch } from 'react-redux';
import { addCurrentUser } from '../features/userSlice';
GoogleSignin.configure({
  webClientId: '397847646741-rpg6qgcel1e7ed8htpjvgfdc90and1c8.apps.googleusercontent.com',
});

const LogWithFacebookAndGoogle = ({ text, dark = false, setVisible = () => {} }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onGoogleButtonPress = async () => {
    setVisible(true);
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    await auth().currentUser.updateProfile({
      photoURL:
        'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    });
    await addUserToFirebaseWithID(
      {
        fullname: auth()?.currentUser?.displayName,
        email: auth()?.currentUser?.email,
        photoURL: auth()?.currentUser?.photoURL,
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
    setVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Login successfully',
    });
    navigation.navigate('HomeStack');
  };
  return (
    <View>
      <View style={styles.bottomHeading}>
        <View style={[styles.bottomHeadingLeft, dark ? styles.bottomBackgroundDark : null]} />
        <Text
          style={[
            TextStyles.textMain,
            TextStyles.textWhite,
            styles.bottomHeadingCenter,
            dark ? styles.bottomColorDark : null,
          ]}
        >
          {text}
        </Text>
        <View style={[styles.bottomHeadingRight, dark ? styles.bottomBackgroundDark : null]} />
      </View>

      <View style={styles.bottomMeta}>
        {/* <TouchableOpacity style={styles.bottomMetaButton}>
          <Image source={Images.ICON.FACEBOOK} style={styles.bottomMetaImage} />
          <Text style={[TextStyles.textMain, styles.metaButtonText]}>FACEBOOK</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={[styles.bottomMetaButton]} onPress={onGoogleButtonPress}>
          <Image source={Images.ICON.GOOGLE} style={styles.bottomMetaImage} />
          <Text style={[TextStyles.textMain, styles.metaButtonText]}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogWithFacebookAndGoogle;

const styles = StyleSheet.create({
  bottomHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  bottomBackgroundDark: {
    backgroundColor: '#5b5b5b',
  },
  bottomColorDark: {
    color: '#5b5b5b',
  },
  bottomHeadingLeft: {
    height: 1,
    backgroundColor: 'white',
    flex: 1,
    marginLeft: 10,
  },
  bottomHeadingCenter: {
    marginHorizontal: 18,
  },
  bottomHeadingRight: {
    height: 1,
    flex: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  bottomMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  bottomMetaButton: [
    {
      padding: 13,
      borderRadius: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#fff',
      height: 60,
    },
    Layout.layoutShadowGrey,
  ],
  bottomMetaImage: [
    {
      width: 40,
      height: 40,
      marginRight: 10,
    },
  ],
  metaButtonText: {
    color: '#000',
    letterSpacing: 0.6,
    marginRight: 8,
  },
});
