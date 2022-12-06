import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import { Images } from '../../assets';
import Counter from './Counter';
import Sizes from '../constants/Size';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import Color from '../constants/Color';
import { formatPrice } from '../utils/formatter';
import { useDispatch } from 'react-redux';
import { changeCartStatus } from '../features/cartSlice';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';

const BillingItemCard = ({ item }) => {
  const id = auth()?.currentUser?.uid;
  const navigation = useNavigation();
  const handleCancell = async () => {
    const data = await firestore().collection('users').doc(id).get();
    const orders = data.data().orders;
    orders.map((one) => {
      if (one.id === item.id) {
        one.status = '2';
      }
    });
    await firestore()
      .collection('users')
      .doc(id)
      .update({
        orders: [...orders],
      })
      .then(() => {
        console.log('User updated!');
      });
  };
  const handleMoveToCompleted = async () => {
    const data = await firestore().collection('users').doc(id).get();
    const orders = data.data().orders;
    orders.map((one) => {
      if (one.id === item.id) {
        one.status = '1';
      }
    });
    await firestore()
      .collection('users')
      .doc(id)
      .update({
        orders: [...orders],
      })
      .then(() => {
        console.log('User updated!');
      });
  };
  const handleOrderCompleted = () => {
    navigation.navigate('');
  };
  return (
    <View style={[LayoutStyles.layoutShadowGrey, styles.card]}>
      <TouchableOpacity style={styles.cardRemover} onPress={handleCancell}>
        <Image source={Images.ICON.CLOSE} />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.cardThumbnail} />
      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={TextStyles.h3}>
          {item.name}
        </Text>
        <View style={styles.contentBottom}>
          <Text style={[TextStyles.h3, styles.cardPrice]}>
            ${formatPrice(item.price * item.quantity)}
          </Text>
          <View
            style={[
              styles.status,
              item.status === '0'
                ? styles.Active
                : item.status === '1'
                ? styles.Completed
                : styles.Cancelled,
            ]}
          >
            <Text
              style={[
                TextStyles.textMain,
                item.status === '0'
                  ? styles.Status_Active
                  : item.status === '1'
                  ? styles.Status_Completed
                  : styles.Status_Cancelled,
              ]}
            >
              {item.status === '0' ? 'Active' : item.status === '1' ? 'Completed' : 'Cancelled'}
            </Text>
          </View>
        </View>
        {item.status === '0' && (
          <View style={styles.active_button}>
            <CustomButton text='Order Received' onPress={handleMoveToCompleted} />
          </View>
        )}
        {item.status === '1' && (
          <View style={styles.completed_button}>
            <CustomButton text='Leave a Review' onPress={handleOrderCompleted} />
          </View>
        )}
      </View>
    </View>
  );
};

export default BillingItemCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: Sizes.sizeBigH,
    marginHorizontal: Sizes.sizeBig,
    paddingHorizontal: Sizes.sizeSmaller,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Sizes.sizeModerate,
  },
  cardThumbnail: {
    width: scaleSizeUI(82),
    height: scaleSizeUI(82),
    borderRadius: Sizes.sizeModerate,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: Sizes.sizeBig,
    paddingVertical: Sizes.sizeBigH,
  },
  cardPrice: {
    color: Colors.primary,
  },
  cardCounter: {
    position: 'absolute',
    bottom: Sizes.sizeModerateH,
    right: Sizes.sizeSmall,
  },
  cardRemover: {
    position: 'absolute',
    top: Sizes.sizeSmall,
    right: Sizes.sizeSmall,
  },
  contentBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Sizes.sizeModerateH,
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: Color.white,
    borderColor: Color.green,
    borderWidth: 1,
    borderRadius: 12,
  },
  Active: {
    borderColor: Color.green,
  },
  Status_Active: {
    color: Color.green,
  },
  Completed: {
    backgroundColor: Color.green,
  },
  Status_Completed: {
    color: Color.white,
  },
  Cancelled: {
    borderColor: Color.red,
  },
  Status_Cancelled: {
    color: Color.red,
  },
  active_button: { width: '100%', height: 40, marginTop: 30 },
  completed_button: {
    width: '100%',
    height: 40,
    marginTop: 30,
  },
});
