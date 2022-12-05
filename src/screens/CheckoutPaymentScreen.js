import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CornerButton from '../components/CornerButton';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import Color from '../constants/Color';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { initUserPayment } from '../features/userSlice';
import { RadioButton } from 'react-native-paper';

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
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
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
    if (!currentUser?.paymentMethod) {
      dispatch(initUserPayment());
    } else {
      // currentUser?.paymentMethod.map((item) =>
      //   setPaymentList([
      //     ...paymentList,
      //     {
      //       iconURL: Images.IMAGES.MASTER_CARD,
      //       text: item.number,
      //     },
      //   ])
      // );
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
          <MyCard
            key={item.id}
            iconURL={item.iconURL}
            text={item.text}
            index={item.id}
            checked={checked}
            setChecked={setChecked}
          />
        ))}
        {/* {creditCardList.map((item, index) => (
          <MyCard
            key={'creditCard' + index}
            iconURL={Images.IMAGES.MASTER_CARD}
            text={item.number}
          />
        ))} */}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.bottomButton}>
          <CustomButton
            text='Add new card'
            onPress={() => navigation.navigate('AddCreditCard')}
            isPrimary={false}
          />
        </View>
        <View style={styles.bottomButton}>
          <CustomButton text='Apply' onPress={() => navigation.navigate('CheckoutOrder')} />
        </View>
      </View>
    </View>
  );
};

export default CheckoutPaymentScreen;

const MyCard = ({
  iconURL = Images.ICON.CASH,
  text = 'Cash Money',
  index,
  checked,
  setChecked,
}) => {
  return (
    <TouchableOpacity
      style={[LayoutStyles.layoutShadowGrey, styles.childrenContainer]}
      onPress={() => setChecked(index)}
    >
      <View style={styles.childrenContainerTop}>
        <Image source={iconURL} style={styles.childrenIcon} />
        <Text style={TextStyles.textMain}>{text}</Text>
      </View>
      <RadioButton
        value={index}
        status={checked === index ? 'checked' : 'unchecked'}
        color={Color.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
    marginTop: 10,
  },
  bottom: {
    marginTop: 'auto',
  },
  childrenContainer: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 20,
    height: 76,
  },
  childrenContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childrenIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
});
