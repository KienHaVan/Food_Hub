import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import Color from '../constants/Color';
import { useState } from 'react';
import BillingItemCard from '../components/BillingItemCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { changeCartStatus, initCartStatus } from '../features/cartSlice';
import { updateUser } from '../features/userSlice';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const statusList = [
  {
    id: 0,
    text: 'Active',
  },
  {
    id: 1,
    text: 'Completed',
  },
  {
    id: 2,
    text: 'Cancelled',
  },
];

const OrderScreen = () => {
  const [checked, setChecked] = useState(0);
  const [orderList, setOrderList] = useState([]);
  const carts = useSelector((state) => state.cart.carts);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth().currentUser.email) {
      navigation.navigate('Welcome');
      return;
    }
    dispatch(initCartStatus());
    const id = auth()?.currentUser?.uid;
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setOrderList(documentSnapshot.data().orders || []);
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h3, styles.heading]}>Orders</Text>
      <View style={styles.tag}>
        {statusList.map((item) => (
          <TouchableOpacity
            style={[styles.tagButton, checked === item.id ? styles.tagButtonActive : null]}
            key={item.id}
            onPress={() => setChecked(item.id)}
          >
            <Text
              style={[
                TextStyles.textMain,
                styles.tagText,
                checked === item.id ? styles.tagTextActive : null,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orderList.map((item, index) => {
          if (Number(item.status) === checked) {
            return <BillingItemCard item={item} key={index.toString()} />;
          }
        })}
      </ScrollView>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Color.white,
  },
  heading: {
    marginBottom: 20,
    marginHorizontal: scaleSizeUI(24),
    alignSelf: 'center',
  },
  tag: {
    marginHorizontal: scaleSizeUI(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagButton: {
    borderBottomWidth: 2,
    flex: 1 / 3,
    borderBottomColor: Color.greyLighter,
  },
  tagButtonActive: {
    borderBottomWidth: 4,
    borderBottomColor: Color.primary,
  },
  tagText: {
    alignSelf: 'center',
  },
  tagTextActive: {
    alignSelf: 'center',
    color: Color.primary,
  },
  content: {
    marginTop: 30,
  },
});
