import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import Counter from './Counter';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../features/cartSlice';
import { Images } from '../../assets';
import { formatPrice } from '../utils/formatter';

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={[LayoutStyles.layoutShadowGrey, styles.card]}>
      <TouchableOpacity
        style={styles.cardRemover}
        onPress={() => dispatch(removeFromCart({ ...item, quantity: item.quantity }))}
      >
        <Image source={Images.ICON.CLOSE} />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.cardThumbnail} />
      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={TextStyles.h3}>
          {item.name}
        </Text>
        <Text style={[TextStyles.h3, styles.cardPrice]}>
          ${formatPrice(item.price * item.quantity)}
        </Text>
      </View>
      <View style={styles.cardCounter}>
        <Counter
          defaultValue={item.quantity}
          onIncrease={() => dispatch(addToCart({ ...item, quantity: 1 }))}
          onDecrease={() => dispatch(removeFromCart({ ...item, quantity: 1 }))}
        />
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: Sizes.sizeBigH,
    marginHorizontal: Sizes.sizeBig,
    paddingHorizontal: Sizes.sizeSmaller,
    paddingBottom: Sizes.sizeModerateH,
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
    paddingVertical: Sizes.sizeLargeH,
  },
  cardPrice: {
    marginTop: Sizes.sizeModerateH,
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
});
