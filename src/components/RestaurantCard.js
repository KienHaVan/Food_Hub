import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

//region Import styling
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
//endregion

import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import FavoriteButton from './FavoriteButton';

const RestaurantCard = ({ data }) => {
  const [fav, setFav] = useState(false);

  return (
    <TouchableOpacity style={[LayoutStyles.layoutShadowGrey, styles.card]}>
      {/*Rating Label*/}
      <View style={[LayoutStyles.layoutCenter, LayoutStyles.layoutShadowGrey, styles.cardRating]}>
        <Text style={[TextStyles.textMain, styles.cardRatingText]}>{data.ratings}</Text>
        <Image source={Images.ICON.STAR} />
        <Text style={[TextStyles.textSmall, styles.cardRatingTextSmall]}>
          ({data.ratingPeople})
        </Text>
      </View>

      {/*Add to favorite*/}
      <FavoriteButton />

      {/*Thumbnail*/}
      <Image source={data.thumbnail} style={styles.cardThumbnail} />

      {/*Content*/}
      <View style={styles.cardContent}>
        {/*Card heading*/}
        <Text style={TextStyles.h3}>{data.name}</Text>
        {/*Card inner content*/}
        <View style={styles.cardContentInner}>
          <View style={styles.cardContentItem}>
            <Image source={Images.ICON.DELIVERY} style={styles.cardContentIcon} />
            <Text style={TextStyles.textSmall}>
              {data.deliveryPrice === 0 ? 'Free delivery' : `${data.deliveryPrice} delivery`}
            </Text>
          </View>

          <View style={styles.cardContentItem}>
            <Image source={Images.ICON.TIME} style={styles.cardContentIcon} />
            <Text style={TextStyles.textSmall}>{data.deliveryTime}</Text>
          </View>
        </View>
        {/*Group of tags*/}
        <View style={styles.labelGroup}>
          {data.categories.map((cat, index) => (
            <View key={index} style={[LayoutStyles.layoutCenter, styles.label]}>
              <Text style={[TextStyles.textSmall, styles.labelText]}>{cat}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  card: {
    width: scaleSizeUI(266),
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
    marginBottom: Sizes.sizeMassiveH + Sizes.sizeModerate,
    marginLeft: Sizes.sizeBig,
  },
  cardThumbnail: {
    width: '100%',
    borderTopLeftRadius: Sizes.sizeModerate,
    borderTopRightRadius: Sizes.sizeModerate,
  },
  cardContent: {
    paddingHorizontal: Sizes.sizeSmall,
    paddingVertical: Sizes.sizeSmallH,
  },
  cardContentInner: {
    flexDirection: 'row',
    marginTop: Sizes.sizeSmallerH,
    marginBottom: Sizes.sizeSmallH,
  },
  cardContentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Sizes.sizeModerate,
  },
  cardContentIcon: {
    marginRight: Sizes.sizeTiny,
  },
  labelGroup: {
    flexDirection: 'row',
  },
  label: {
    marginRight: Sizes.sizeSmaller,
    padding: Sizes.sizeSmaller,
    borderRadius: Sizes.sizeSmaller,
    backgroundColor: Colors.greyLighter,
  },
  labelText: {
    textTransform: 'uppercase',
  },
  cardRating: {
    flexDirection: 'row',
    position: 'absolute',
    top: Sizes.sizeSmallerH,
    left: Sizes.sizeSmaller,
    zIndex: 1,
    backgroundColor: Colors.white,
    paddingVertical: Sizes.sizeTinyH,
    paddingHorizontal: Sizes.sizeSmaller,
    borderRadius: 100,
  },
  cardRatingText: {
    marginRight: Sizes.sizeTiny,
    color: Colors.secondary,
  },
  cardRatingTextSmall: {
    marginLeft: Sizes.sizeTiny - 2,
  },
});
