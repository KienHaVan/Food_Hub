import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const inputLabel = [
  { title: 'Full name' },
  { title: 'Mobile number' },
  { title: 'State' },
  { title: 'City' },
  { title: 'Street (Include house number)' },
];
const EditProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <KeyBoardAvoidingWaraper>
      <View style={styles.container}>
        <View style={LayoutStyles.layoutStretch}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.goBack('Profile')}
          />
          <Text style={TextStyles.h3}>Add new address</Text>
          <View style={styles.space} />
        </View>
        <View style={styles.textFieldContainer}>
          {inputLabel.map((item) => (
            <View key={item.title} style={styles.textInput}>
              <InputField label={item.title} />
            </View>
          ))}
        </View>
        <View style={styles.buttonSave}>
          <CustomButton text='SAVE' />
        </View>
      </View>
    </KeyBoardAvoidingWaraper>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: scaleSizeUI(30),
    paddingHorizontal: scaleSizeUI(26),
  },
  space: {
    width: 40,
    height: 40,
  },
  textFieldContainer: {
    marginVertical: scaleSizeUI(30),
  },
  textInput: {
    marginBottom: scaleSizeUI(16),
  },
  buttonSave: {
    width: scaleSizeUI(248),
    height: scaleSizeUI(60),
    alignSelf: 'center',
  },
});
