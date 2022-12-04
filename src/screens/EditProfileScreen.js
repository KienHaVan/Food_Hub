import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentUser } from '../features/userSlice';
import { addUserToFirebaseWithID } from '../utils/authentication';

const EditProfileScreen = () => {
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (currentUser) {
      setFullname(currentUser.fullname);
      setPhoneNumber(currentUser.phoneNumber);
      setRegion(currentUser.region);
      setCity(currentUser.city);
      setStreet(currentUser.street);
    }
  }, [currentUser]);

  const handleUpdateUserDetail = async () => {
    const formValues = {
      fullname: fullname,
      phoneNumber: phoneNumber,
      region: region,
      city: city,
      street: street,
    };
    dispatch(updateCurrentUser(formValues));
    await addUserToFirebaseWithID(formValues, currentUser.id);
    navigation.navigate('Profile');
    console.log(currentUser);
  };
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
          <View style={styles.textInput}>
            <InputField
              label='Full name'
              value={fullname}
              onChangeText={(text) => setFullname(text)}
            />
          </View>
          <View style={styles.textInput}>
            <InputField
              label='Mobile number'
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
          <View style={styles.textInput}>
            <InputField label='State' value={region} onChangeText={(text) => setRegion(text)} />
          </View>
          <View style={styles.textInput}>
            <InputField label='City' value={city} onChangeText={(text) => setCity(text)} />
          </View>
          <View style={styles.textInput}>
            <InputField
              label='Street (Include house number)'
              onChangeText={(text) => setStreet(text)}
              value={street}
            />
          </View>
        </View>
        <View style={styles.buttonSave}>
          <CustomButton text='SAVE' onPress={handleUpdateUserDetail} />
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
