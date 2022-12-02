import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const ProfileScreen = () => {
  const [fullName, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      setFullname(currentUser?.fullname);
      setPhoneNumber(currentUser?.phoneNumber);
      setEmail(currentUser?.email);
    }
  }, [currentUser]);

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
            <InputField label='Full name' value={fullName} />
          </View>
          <View style={styles.textInput}>
            <InputField label='Email' value={email} />
          </View>
          <View style={styles.textInput}>
            <InputField label='Phone number' value={phoneNumber} />
            {!currentUser.phoneNumber && (
              <Text style={[TextStyles.textMain, styles.warning]}>
                Update your phone number in Edit page
              </Text>
            )}
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
});
