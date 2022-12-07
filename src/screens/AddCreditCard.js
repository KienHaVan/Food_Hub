import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import CreditCard from '../components/CreditCard';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import Color from '../constants/Color';
import TextStyles from '../styles/TextStyles';
import { addUserToFirebaseWithID } from '../utils/authentication';

const AddCreditCard = () => {
  const navigation = useNavigation();
  const [error, setError] = useState({});
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [CVV, setCVV] = useState('');
  const [name, setName] = useState('');
  const id = auth()?.currentUser?.uid;
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
              CVV,
              name,
            },
          ],
        })
        .then(() => {
          console.log('User updated!');
          navigation.goBack();
        });
      // eslint-disable-next-line no-catch-shadow
    } catch (err) {
      console.log(err);
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
    marginTop: 150,
  },
  cardDetail: {
    flex: 1,
    // flexShrink: 0,
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
