import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets';
import CheckoutPaymentCard from '../components/CheckoutPaymentCard';
import CornerButton from '../components/CornerButton';
import CustomButton from '../components/CustomButton';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const paymentList = [
  {
    id: 0,
    iconURL: Images.ICON.WALLET,
    text: 'My Wallet',
  },
  {
    id: 1,
    iconURL: Images.ICON.CASH,
    text: 'Cash Money',
  },
];
const CheckoutPaymentScreen = () => {
  const [checked, setChecked] = useState(0);
  const [creditCardList, setCreditCardList] = useState([]);
  const navigation = useNavigation();
  const theList = [...paymentList];
  creditCardList.map((item, index) => {
    theList.push({
      id: 2 + Number(index),
      iconURL: Images.IMAGES.MASTER_CARD,
      text: item.number.toString(),
    });
  });
  useEffect(() => {
    if (!auth().currentUser.email) {
      navigation.navigate('Welcome');
      return;
    }
    const id = auth()?.currentUser?.uid;
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setCreditCardList(documentSnapshot.data().payment || []);
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.navigate('HomeStack')}
        />
        <Text style={TextStyles.h3}>Payment Methods</Text>
        <View style={styles.hidden}>
          <CornerButton />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {theList.map((item) => (
          <CheckoutPaymentCard
            key={item.id}
            iconURL={item.iconURL}
            text={item.text}
            index={item.id}
            checked={checked}
            setChecked={setChecked}
          />
        ))}
      </ScrollView>
      <View style={[styles.bottom, LayoutStyles.layoutShadowGrey]}>
        <View style={styles.bottomButton}>
          <CustomButton
            text='Add new card'
            onPress={() => navigation.navigate('AddCreditCard')}
            isPrimary={false}
          />
        </View>
        <View style={styles.bottomButton}>
          <CustomButton
            text='Apply'
            onPress={() =>
              navigation.navigate('CheckoutOrder', { paymentMethod: theList[checked] })
            }
          />
        </View>
      </View>
    </View>
  );
};

export default CheckoutPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Color.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: scaleSizeUI(24),
  },
  hidden: {
    opacity: 0,
  },
  bottomButton: {
    height: 60,
    marginTop: 10,
  },
  bottom: {
    marginTop: 'auto',
    marginHorizontal: scaleSizeUI(24),
  },
});
