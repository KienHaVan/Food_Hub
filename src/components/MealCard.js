import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../assets';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import {
  addToFavoriteFoodList,
  getFireStoreUserData,
  removeToFavoriteFoodList,
} from '../features/userSlice';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { formatPrice, formatRating } from '../utils/formatter';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import FavoriteButton from './FavoriteButton';

const MealCard = ({ data, isFavorite = false }) => {
  const navigation = useNavigation();
  const [fav, setFav] = useState(isFavorite);
  const dispatch = useDispatch();
  const { currentUser, currentUserFirestoreData, favoriteFoodList } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getFireStoreUserData(currentUser.id));
    // console.log('fireStore:', currentUserFirestoreData);
    // const result = { ...currentUserFirestoreData, favoriteFood: [...favoriteFoodList] };
    // console.log(result);
    // addUserToFirebaseWithID(result, currentUser.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.id, dispatch]);

  const handlePress = async (item) => {
    setFav(!fav);
    if (!fav) {
      dispatch(addToFavoriteFoodList(item));
    } else {
      dispatch(removeToFavoriteFoodList(item));
    }
    const result = { ...currentUserFirestoreData, favoriteFood: [...item] };
    await addUserToFirebaseWithID(result, currentUser.id);
  };

  // useEffect(() => {
  //   dispatch(getFireStoreUserData(currentUser.id));
  //   console.log('fireStore:', currentUserFirestoreData);
  //   const result = { ...currentUserFirestoreData, favoriteFood: [...favoriteFoodList] };
  //   console.log(result);
  //   addUserToFirebaseWithID(result, currentUser.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser.id, dispatch, favoriteFoodList]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('FoodDetail', { data: data, isFavorite: fav })}
      style={[LayoutStyles.layoutShadowGrey, styles.card]}
    >
      <FavoriteButton handlePress={() => handlePress(data)} isFavorite={fav} />
      <View style={[styles.price, LayoutStyles.layoutShadowGrey]}>
        <Text style={TextStyles.textMain}>
          $ <Text style={[TextStyles.h3, styles.priceText]}>{formatPrice(data.price)}</Text>
        </Text>
      </View>
      <Image source={{ uri: data.image }} style={styles.cardThumbnail} />
      <View style={styles.cardContent}>
        <View style={[LayoutStyles.layoutShadowGrey, styles.rating]}>
          <Image source={Images.ICON.STAR} />
          <Text style={[TextStyles.textMain, styles.cardRatingText]}>
            {formatRating(data.rating)}
          </Text>
          <Text style={TextStyles.textSmall}>({data.ratingAmount})</Text>
        </View>
        <Text numberOfLines={2} style={TextStyles.h3}>
          {data.name}
        </Text>
        <Text numberOfLines={3} style={[TextStyles.textMain, styles.cardDescription]}>
          {data.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MealCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
    marginHorizontal: Sizes.sizeBig,
    marginBottom: Sizes.sizeBigH,
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
