import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const textFieldTitle = [{ title: 'Full name' }, { title: 'Email' }, { title: 'Phone number' }];

const ProfileScreen = () => {
  return (
    <KeyBoardAvoidingWaraper>
      <ImageBackground
        source={Images.IMAGES.PROFILE_BACKGROUND}
        style={styles.profileImageBackground}
      >
        <CornerButton sourceImage={Images.ICON.ARROW_LEFT} />
        <View style={styles.avatarContainer}>
          <Image resizeMode='cover' source={Images.IMAGES.AVATAR} style={styles.avatar} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>Eljad Eandaz</Text>
          <Text style={[TextStyles.textMain, styles.editInfo]}>Edit profile</Text>
        </View>
        <View style={styles.textFieldContainer}>
          {textFieldTitle.map((item) => (
            <View key={item.title} style={styles.textInput}>
              <InputField label={item.title} />
            </View>
          ))}
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
    color: Colors.black,
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
});
