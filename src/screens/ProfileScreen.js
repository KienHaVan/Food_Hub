import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import { getFireStoreUserData } from '../features/userSlice';
import TextStyles from '../styles/TextStyles';
import { height, scaleSizeUI } from '../utils/scaleSizeUI';

const ProfileScreen = () => {
  const [fullName, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const { currentUser, currentUserFirestoreData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFireStoreUserData(currentUser.id));
    if (currentUserFirestoreData) {
      setFullname(currentUserFirestoreData?.fullname);
      setPhoneNumber(currentUserFirestoreData?.phoneNumber);
      setEmail(currentUserFirestoreData?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, dispatch]);

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
        <View style={styles.avatarContainer}>
          <Image resizeMode='cover' source={{ uri: currentUser.photoURL }} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{currentUser.fullname}</Text>
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
    height: scaleSizeUI(40),
    alignSelf: 'center',
  },
});
