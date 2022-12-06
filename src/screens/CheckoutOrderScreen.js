import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CornerButton from '../components/CornerButton';
import { Images } from '../../assets';
import { useNavigation, useRoute } from '@react-navigation/native';
import TextStyles from '../styles/TextStyles';
import Color from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import CartCard from '../components/CartCard';
import { useDispatch, useSelector } from 'react-redux';
import Sizes from '../constants/Size';
import CheckoutPaymentCard from '../components/CheckoutPaymentCard';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import CustomButton from '../components/CustomButton';
import { formatPrice } from '../utils/formatter';
import Loader from '../components/Loader';
import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { resetCart } from '../features/cartSlice';
import { useEffect } from 'react';

const CheckoutOrderScreen = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [address, setAddress] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const carts = useSelector((state) => state.cart.carts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currentUser = useSelector((state) => state.user.currentUser);
  const paymentMethod = route.params.paymentMethod;
  const dispatch = useDispatch();
  const id = auth()?.currentUser?.uid;
  useEffect(() => {
    const checkAddress = async () => {
      const data = await firestore().collection('users').doc(id).get();
      const address = data.data().address;
      if (!address) {
        navigation.navigate('EditProfile');
      } else {
        setAddress(address);
      }
    };
    checkAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlaceOrder = async () => {
    setShowLoader(true);
    const data = await firestore().collection('users').doc(id).get();
    const orders = data.data().orders;
    if (!orders) {
      await addUserToFirebaseWithID(
        {
          ...data.data(),
          orders: [],
        },
        auth()?.currentUser?.uid
      );
    }
    await firestore()
      .collection('users')
      .doc(id)
      .update({
        orders: [...orders, ...carts],
      })
      .then(() => {
        console.log('User updated!');
      });
    dispatch(resetCart());
    // await firestore()
    //   .collection('users')
    //   .doc(id)
    //   .update({
    //     carts: [],
    //   })
    //   .then(() => {
    //     console.log('User updated!');
    //   });
    setTimeout(() => {
      navigation.navigate('Billing');
      setShowLoader(false);
    }, 5000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />
        <Text style={TextStyles.h3}>Checkout Orders</Text>
        <View style={styles.hidden}>
          <CornerButton />
        </View>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.location, LayoutStyles.layoutShadowGrey]}>
          <Text style={[TextStyles.h3, styles.locationTop]}>Deliver to</Text>
          <View style={styles.locationInfo}>
            <Image source={Images.ICON.CHECKOUT_LOCATION} style={styles.locationIcon} />
            <View style={styles.locationInfoRight}>
              <Text style={TextStyles.h3}>Home</Text>
              <Text style={TextStyles.textMain}>{address}</Text>
            </View>
          </View>
        </View>
        <View style={styles.cart}>
          <Text style={[TextStyles.h3, styles.locationCart]}>Order Summary</Text>
          {carts.map((item, index) => (
            <CartCard item={item} key={index.toString()} />
          ))}
        </View>
        <View>
          <CheckoutPaymentCard
            showingRadio={false}
            iconURL={paymentMethod.iconURL}
            text={paymentMethod.text}
            disabled={true}
          />
        </View>
        <View style={[styles.summary, LayoutStyles.layoutShadowGrey]}>
          <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
            <Text style={TextStyles.textMain}>Subtotal</Text>
            <Text style={TextStyles.h3}>${formatPrice(totalPrice)}</Text>
          </View>

          <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
            <Text style={TextStyles.textMain}>Delivery Fee</Text>
            <Text style={TextStyles.h3}>${formatPrice(5)}</Text>
          </View>

          <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
            <Text style={TextStyles.textMain}>Promo</Text>
            <Text style={TextStyles.h3}>$0</Text>
          </View>

          <View style={styles.theLine} />

          <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
            <Text style={TextStyles.textMain}>Total</Text>
            <Text style={TextStyles.h3}>${formatPrice(totalPrice + 5)}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <CustomButton text='Place Order' onPress={handlePlaceOrder} />
      </View>
      <View>
        <Loader loaderVisible={showLoader} JsonSource={require('../../assets/delivery.json')} />
      </View>
    </View>
  );
};

export default CheckoutOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Color.white,
  },
  content: {
    flex: 1,
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
  location: {
    padding: 20,
    backgroundColor: Color.white,
    borderRadius: 24,
    marginVertical: 20,
    marginHorizontal: scaleSizeUI(24),
  },
  locationTop: {
    paddingBottom: 12,
    marginBottom: 16,
    borderBottomColor: Color.greyLighter,
    borderBottomWidth: 1,
  },
  locationCart: {
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomColor: Color.greyLighter,
    borderBottomWidth: 1,
    marginHorizontal: scaleSizeUI(24),
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 40,
    height: 40,
  },
  locationInfoRight: {
    marginLeft: 20,
  },
  cart: {
    marginBottom: 20,
  },
  bottomButton: {
    height: 60,
    marginHorizontal: scaleSizeUI(24),
    marginVertical: scaleSizeUI(12, true),
  },
  summaryLine: {
    paddingVertical: Sizes.sizeSmallerH,
  },
  summary: {
    marginHorizontal: scaleSizeUI(24),
    backgroundColor: Color.white,
    padding: 16,
    borderRadius: 24,
    marginBottom: 20,
  },
  theLine: {
    height: 1,
    backgroundColor: Color.greyLighter,
    color: Color.greyLighter,
    marginVertical: 8,
  },
});
