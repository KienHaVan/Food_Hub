import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//region Import styling
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
//endregion

import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import FavoriteButton from './FavoriteButton';

const MealCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetail', { data: data })}
      style={[LayoutStyles.layoutShadowGrey, styles.card]}
    >
      {/*Add to favorite*/}
      <FavoriteButton />

      {/*Price label*/}
      <View style={[styles.price, LayoutStyles.layoutShadowGrey]}>
        <Text style={TextStyles.textMain}>
          $ <Text style={[TextStyles.h3, styles.priceText]}>{data.price}</Text>
        </Text>
      </View>

      {/*Thumbnail*/}
      <Image source={data.image} style={styles.cardThumbnail} />

      {/*Card content*/}
      <View style={styles.cardContent}>
        <View style={[LayoutStyles.layoutShadowGrey, styles.rating]}>
          <Image source={Images.ICON.STAR} />
          <Text style={[TextStyles.textMain, styles.cardRatingText]}>{data.ratings}</Text>
          <Text style={TextStyles.textSmall}>({data.ratingCount})</Text>
        </View>
        <Text style={TextStyles.h3}>{data.name}</Text>
        <Text style={[TextStyles.textMain, styles.cardDescription]}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
    marginBottom: Sizes.sizeBig,
  },
  cardThumbnail: {
    width: '100%',
    height: scaleSizeUI(165, true),
    borderRadius: Sizes.sizeModerate,
  },
  cardContent: {
    alignItems: 'flex-start',
    paddingHorizontal: Sizes.sizeModerate,
    paddingBottom: Sizes.sizeBigH,
  },
  rating: {
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.sizeModerate,
    paddingVertical: Sizes.sizeTinyH,
    bottom: Sizes.sizeBigH,
  },
  cardRatingText: {
    color: Colors.secondary,
    marginVertical: Sizes.sizeSmallerH,
    marginHorizontal: Sizes.sizeTiny,
  },
  cardDescription: {
    marginTop: Sizes.sizeTinyH,
  },
  price: {
    position: 'absolute',
    zIndex: 1,
    top: Sizes.sizeSmallH,
    left: Sizes.sizeSmall,
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingHorizontal: Sizes.sizeModerate,
    paddingVertical: Sizes.sizeTinyH,
  },
  priceText: {
    color: Colors.primary,
  },
});
