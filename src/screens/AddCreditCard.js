import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CreditCard from '../components/CreditCard';
import CornerButton from '../components/CornerButton';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import Color from '../constants/Color';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { useDispatch, useSelector } from 'react-redux';
import {
  initUserPayment,
  InitUserPayment,
  updateCurrentUser,
  updateUserPayment,
} from '../features/userSlice';

const AddCreditCard = () => {
  const navigation = useNavigation();
  const [number, setNumber] = useState('0000 0000 0000 0000');
  const [date, setDate] = useState('');
  const [VCC, setVCC] = useState('');
  const [name, setName] = useState('HA VAN KIEN');
  const id = auth()?.currentUser?.uid;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    if (!currentUser?.paymentMethod) {
      dispatch(initUserPayment());
    }
    const checkPayment = async () => {
      const data = await firestore().collection('users').doc(id).get();
      const payment = data.data().payment;
      if (!payment) {
        await addUserToFirebaseWithID(
          {
            ...data.data(),
            payment: [],
          },
          auth()?.currentUser?.uid
        );
      }
    };
    checkPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    const data = await firestore().collection('users').doc(id).get();
    const payment = data.data().payment;
    try {
      await firestore()
        .collection('users')
        .doc(id)
        .update({
          payment: [
            ...payment,
            {
              number,
              date,
              VCC,
              name,
            },
          ],
        })
        .then(() => {
          dispatch(updateUserPayment({ number, date, VCC, name }));
          console.log('User updated!');
          navigation.goBack();
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyBoardAvoidingWaraper>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.goBack()}
          />
          <Text style={TextStyles.h3}>ADD CREDIT CARDS</Text>
          <View style={styles.hidden}>
            <CornerButton />
          </View>
        </View>
        <CreditCard number={number} date={date} name={name} />
        <View style={styles.cardDetail}>
          <Text style={TextStyles.h2}>Card Detail</Text>
          <View style={styles.cardDetailContainer}>
            <InputField
              placeholder={'Card number'}
              onChangeText={(newText) => setNumber(newText)}
              keyboardType='numeric'
              maxLength={16}
            />
            <View style={styles.cardDetailCenter}>
              <View style={{ flex: 0.5 }}>
                <InputField
                  placeholder={'Expire date'}
                  onChangeText={(newText) => setDate(newText)}
                  keyboardType='numeric'
                  maxLength={4}
                />
              </View>
              <View style={{ flex: 0.5, marginLeft: 10 }}>
                <InputField
                  placeholder={'CVV'}
                  onChangeText={(newText) => setVCC(newText)}
                  keyboardType='numeric'
                  maxLength={3}
                />
              </View>
            </View>
            <InputField
              placeholder={'Card holder'}
              onChangeText={(newText) => setName(newText)}
              autoCapitalize={'characters'}
            />
          </View>
        </View>
        <View style={styles.bottomButton}>
          <CustomButton text='SAVE' onPress={handleSave} />
        </View>
      </View>
    </KeyBoardAvoidingWaraper>
  );
};

export default AddCreditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Color.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hidden: {
    opacity: 0,
  },
  bottomButton: {
    height: 60,
    marginTop: 150,
  },
  cardDetail: {
    flex: 1,
  },
  cardDetailContainer: {
    marginTop: 20,
    flex: 1,
  },
  cardDetailCenter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
