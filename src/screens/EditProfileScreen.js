import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { height, scaleSizeUI } from '../utils/scaleSizeUI';
import { getFireStoreUserData } from '../features/userSlice';
import { useDispatch } from 'react-redux';

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const navigation = useNavigation();
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    const checkAddress = async () => {
      const userData = await firestore().collection('users').doc(id).get();
      const address = userData.data().address;
      if (!address) {
        await addUserToFirebaseWithID(
          {
            ...userData.data(),
            address: '',
          },
          auth()?.currentUser?.uid
        );
      }
    };
    checkAddress();
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        const data = documentSnapshot.data();
        setFullname(data.fullname || '');
        setPhoneNumber(data.phoneNumber || '');
        if (data?.address?.length) {
          const userAddress = data.address.split(', ');
          setCity(userAddress[2]);
          setRegion(userAddress[1]);
          setStreet(userAddress[0]);
        }
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserDetail = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(id)
        .update({
          fullname: fullname,
          phoneNumber: phoneNumber,
          address: `${street}, ${region}, ${city}`,
        });
      dispatch(getFireStoreUserData(id));
    } catch (error) {
      console.log('Error: ', error);
    }
    navigation.goBack();
  };
  return (
    <KeyBoardAvoidingWaraper>
      <View style={styles.container}>
        <View style={LayoutStyles.layoutStretch}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.goBack()}
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
            <InputField label='City' value={city} onChangeText={(text) => setCity(text)} />
          </View>
          <View style={styles.textInput}>
            <InputField label='District' value={region} onChangeText={(text) => setRegion(text)} />
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
