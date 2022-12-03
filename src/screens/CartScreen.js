import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Images } from '../../assets';
import CartCard from '../components/CartCard';
import CornerButton from '../components/CornerButton';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import CustomButton from '../components/CustomButton';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import { formatPrice } from '../utils/formatter';
import { updateUser } from '../features/userSlice';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.carts);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const currentUser = useSelector((state) => state.user.currentUser);

  //TODO: Bug here: when the cart is empty => does not update on firestore
  useEffect(() => {
    dispatch(updateUser({ userId: currentUser.id, newData: { carts: carts } }));
  }, [carts]);

  const renderCartItem = ({ item }) => {
    return <CartCard item={item} />;
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />
        <Text style={TextStyles.h3}>Cart</Text>
        <View
          style={{
            width: Sizes.sizeLarge + Sizes.sizeSmaller,
            height: Sizes.sizeLarge + Sizes.sizeSmaller,
          }}
        />
      </View>

      <View style={styles.cartList}>
        <FlatList
          data={carts}
          keyExtractor={(item) => item.id}
          renderItem={renderCartItem}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: Sizes.sizeMassive }}
        />
      </View>

      <View style={[LayoutStyles.layoutShadowGrey, styles.summary]}>
        <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
          <Text style={TextStyles.textMain}>Subtotal</Text>
          <Text style={TextStyles.h3}>${formatPrice(totalPrice)}</Text>
        </View>

        <View style={[LayoutStyles.layoutStretch, styles.summaryLine]}>
          <Text style={TextStyles.textMain}>Delivery</Text>
          <Text style={TextStyles.h3}>${formatPrice(5)}</Text>
        </View>

        <View style={[LayoutStyles.layoutStretch, { paddingVertical: Sizes.sizeModerateH }]}>
          <Text style={TextStyles.textMain}>Total</Text>
          <Text style={TextStyles.h3}>${formatPrice(totalPrice + 5)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton text='CHECKOUT' />
        </View>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
  },
  header: {
    marginBottom: Sizes.sizeBigH,
    marginHorizontal: Sizes.sizeBig,
  },
  cartList: {
    height: '50%',
  },
  summary: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.sizeMassive,
    borderTopRightRadius: Sizes.sizeMassive,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: Sizes.sizeBig,
    paddingVertical: Sizes.sizeBigH,
    borderColor: Colors.greyLighter,
  },
  summaryLine: {
    paddingVertical: Sizes.sizeModerateH,
    borderBottomWidth: 1,
    borderColor: Colors.greyLighter,
  },
  buttonContainer: {
    width: '80%',
    marginTop: Sizes.sizeModerateH,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: scaleSizeUI(60, true),
  },
});
