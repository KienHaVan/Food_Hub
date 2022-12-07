import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { height, scaleSizeUI } from '../utils/scaleSizeUI';

const ProfileScreen = () => {
  const [fullName, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const navigation = useNavigation();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(currentUser.id)
      .onSnapshot((documentSnapshot) => {
        setFullname(documentSnapshot?.data()?.fullname || '');
        setEmail(documentSnapshot?.data()?.email || '');
        setPhoneNumber(documentSnapshot?.data()?.phoneNumber || '');
        setPhotoURL(documentSnapshot?.data()?.photoURL || '');
      });
    return () => subscriber();
  }, [currentUser]);

  const handleChoosePhoto = () => {
    launchImageLibrary({}, (res) => {
      if (res?.assets) {
        firestore().collection('users').doc(currentUser.id).update({
          photoURL: res?.assets[0]?.uri,
        });
      }
    });
  };

  return (
    <KeyBoardAvoidingWaraper>
      <ImageBackground
        source={Images.IMAGES.PROFILE_BACKGROUND}
        style={styles.profileImageBackground}
      >
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.navigate('HomeStack')}
        />
        <View style={[styles.avatarContainer, LayoutStyles.layoutShadowRed]}>
          <Image
            resizeMode='cover'
            source={{ uri: photoURL || currentUser.photoURL }}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleChoosePhoto} style={styles.choosePicture}>
            <Image source={Images.ICON.CAMERA} />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{fullName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Text style={[TextStyles.textMain, styles.editInfo]}>Edit profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textFieldContainer}>
          <View style={styles.textInput}>
            <InputField
              label='Full name'
              value={fullName}
              isDisabled
              isEditable={false}
              isShowKeyboard={false}
              isSelected={false}
            />
          </View>
          <View style={styles.textInput}>
            <InputField
              label='Email'
              value={email}
              isDisabled
              isEditable={false}
              isShowKeyboard={false}
              isSelected={false}
            />
          </View>
          <View style={styles.textInput}>
            <InputField
              label='Phone number'
              value={phoneNumber}
              isDisabled
              isEditable={false}
              isShowKeyboard={false}
              isSelected={false}
            />
          </View>
          <View style={styles.navigationButton}>
            <CustomButton
              text='Go to edit profile'
              onPress={() => navigation.navigate('EditProfile')}
            />
          </View>
        </View>
      </ImageBackground>
    </KeyBoardAvoidingWaraper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileImageBackground: {
    flex: 1,
    paddingTop: Sizes.sizeLargeH,
    paddingHorizontal: Sizes.sizeBigH,
    height: height,
  },
  avatarContainer: {
    width: scaleSizeUI(108),
    height: scaleSizeUI(108),
    backgroundColor: Colors.white,
    padding: Sizes.sizeSmall,
    borderRadius: 99999,
    marginTop: Sizes.sizeLargeH,
    alignSelf: 'center',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 99999,
  },
  infoContainer: {
    marginTop: 13,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.secondaryDarker,
    textAlign: 'center',
  },
  editInfo: {
    textAlign: 'center',
  },
  textFieldContainer: {
    marginTop: scaleSizeUI(40),
  },
  textInput: {
    marginBottom: scaleSizeUI(20),
  },
  warning: {
    color: Colors.primary,
    marginTop: 6,
  },
  navigationButton: {
    width: scaleSizeUI(248),
    height: scaleSizeUI(60),
    alignSelf: 'center',
    marginTop: 16,
  },
  choosePicture: {
    width: 27,
    height: 27,
    borderRadius: 9999,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 8,
    right: 10,
  },
});
