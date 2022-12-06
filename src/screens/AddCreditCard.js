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
import { err } from 'react-native-svg/lib/typescript/xml';

const AddCreditCard = () => {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  console.log('🚀 ~ file: AddCreditCard.js:27 ~ AddCreditCard ~ error', error);
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [name, setName] = useState('');
  const id = auth()?.currentUser?.uid;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  useEffect(() => {
    // if (!currentUser?.paymentMethod) {
    //   dispatch(initUserPayment());
    // }
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
  const checkValid = () => {
    if (!number) {
      setError({ ...error, cardNumber: 'Please enter your card number!' });
      return false;
    } else if (number.toString().length < 12) {
      setError({ ...error, cardNumber: 'Invalid card number!' });
      return false;
    } else if (number.toString().length >= 12) {
      setError({ ...error, cardNumber: undefined });
      return true;
    }
    if (!date) {
      setError({ ...error, expireDate: 'Enter expire date!' });
      return false;
    } else if (date) {
      setError({ ...error, expireDate: undefined });
      return true;
    }
    if (!CVV) {
      setError({ ...error, CVV: 'Enter CVV!' });
      return false;
    } else if (CVV) {
      setError({ ...error, CVV: undefined });
      return true;
    }
    if (!name) {
      setError({ ...error, cardHolder: 'Please enter your name!' });
      return false;
    } else if (name) {
      setError({ ...error, cardHolder: undefined });
      return true;
    }
  };
  const handleSave = async () => {
    if (checkValid()) {
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
                CVV,
                name,
              },
            ],
          })
          .then(() => {
            console.log('User updated!');
            navigation.goBack();
          });
      } catch (error) {
        console.log(error);
      }
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
          <Text style={TextStyles.h3}>Add Credit Cards</Text>
          <View style={styles.hidden}>
            <CornerButton />
          </View>
        </View>
        <CreditCard
          number={number || '0000000000000000'}
          date={date}
          name={name || 'HA VAN KIEN'}
        />
        <View style={styles.cardDetail}>
          <Text style={TextStyles.h2}>Card Detail</Text>
          <View style={styles.cardDetailContainer}>
            <InputField
              placeholder={'Card number'}
              onChangeText={(newText) => setNumber(newText)}
              keyboardType='numeric'
              maxLength={16}
            />
            {error?.cardNumber && <Text style={styles.error}>{error?.cardNumber}</Text>}
            <View style={styles.cardDetailCenter}>
              <View style={{ flex: 0.5 }}>
                <InputField
                  placeholder={'Expire date'}
                  onChangeText={(newText) => setDate(newText)}
                  keyboardType='numeric'
                  maxLength={4}
                />
                {error?.expireDate && <Text style={styles.error}>{error?.expireDate}</Text>}
              </View>
              <View style={{ flex: 0.5, marginLeft: 10 }}>
                <InputField
                  placeholder={'CVV'}
                  onChangeText={(newText) => setCVV(newText)}
                  keyboardType='numeric'
                  maxLength={3}
                />
                {error?.CVV && <Text style={styles.error}>{error?.CVV}</Text>}
              </View>
            </View>
            <InputField
              placeholder={'Card holder'}
              onChangeText={(newText) => setName(newText)}
              autoCapitalize={'characters'}
            />
            {error?.cardHolder && <Text style={styles.error}>{error?.cardHolder}</Text>}
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
    marginTop: 30,
    marginBottom: 20,
  },
  cardDetail: {
    flex: 1,
    flexShrink: 0,
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
  error: {
    color: 'red',
    marginTop: 2,
  },
});
