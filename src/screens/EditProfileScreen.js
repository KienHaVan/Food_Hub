import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import { getFireStoreUserData, updateCurrentUser } from '../features/userSlice';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { height, scaleSizeUI } from '../utils/scaleSizeUI';
import auth from '@react-native-firebase/auth';

const EditProfileScreen = () => {
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const currentUserFirestoreData = useSelector((state) => state.user.currentUserFirestoreData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    dispatch(getFireStoreUserData(id));
    if (currentUserFirestoreData) {
      const address = currentUserFirestoreData.address.split(',');
      setFullname(currentUserFirestoreData.fullname);
      setPhoneNumber(currentUserFirestoreData.phoneNumber);
      setRegion(address[2]);
      setCity(address[1]);
      setStreet(address[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleUpdateUserDetail = () => {
    const formValues = {
      phoneNumber: phoneNumber,
      address: `${street}, ${city}, ${region}`,
    };
    dispatch(updateCurrentUser(formValues));
    addUserToFirebaseWithID({ ...currentUserFirestoreData, ...formValues }, id);
    navigation.navigate('HomeStack');
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
              keyboardType='numeric'
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
    backgroundColor: Colors.white,
    height: height,
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
