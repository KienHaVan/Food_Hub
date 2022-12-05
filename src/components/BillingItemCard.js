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

const BillingItemCard = () => {
  return (
    <View style={[LayoutStyles.layoutShadowGrey, styles.card]}>
      <TouchableOpacity style={styles.cardRemover}>
        <Image source={Images.ICON.CLOSE} />
      </TouchableOpacity>
      <Image source={Images.IMAGES.AVATAR} style={styles.cardThumbnail} />
      <View style={styles.cardContent}>
        <Text numberOfLines={2} style={TextStyles.h3}>
          Noddles
        </Text>
        <View style={styles.contentBottom}>
          <Text style={[TextStyles.h3, styles.cardPrice]}>$30</Text>
          <View style={styles.status}>
            <Text style={[TextStyles.textMain, styles.Status_Active]}>Active</Text>
          </View>
        </View>
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
    paddingVertical: Sizes.sizeLargeH,
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
});
