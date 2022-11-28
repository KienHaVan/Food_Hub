import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const CartCard = ({ item }) => {
  return (
    <View style={[LayoutStyles.layoutShadowGrey, styles.card]}>
      <Image source={item.image} style={styles.cardThumbnail} />
      <View style={styles.cardContent}>
        <Text style={TextStyles.h3}>{item.name}</Text>
        <Text style={TextStyles.h3}>{item.price}</Text>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: Sizes.sizeBigH,
    flexDirection: 'row',
    borderRadius: Sizes.sizeModerate,
  },
  cardThumbnail: {
    width: scaleSizeUI(82),
    height: '100%',
    borderRadius: Sizes.sizeModerate,
  },
  cardContent: {
    paddingHorizontal: Sizes.sizeBig,
    paddingVertical: Sizes.sizeLargeH,
  },
});
