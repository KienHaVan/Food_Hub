import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { addUserToFirebaseWithID } from '../utils/authentication';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import FavoriteButton from './FavoriteButton';
import { useNavigation } from '@react-navigation/native';

const RestaurantCard = ({ data, isFavorite = false, isFullWidth = false }) => {
  const [fav, setFav] = useState(isFavorite);
  const id = auth()?.currentUser?.uid;
  const navigation = useNavigation();

  useEffect(() => {
    const checkFavoriteRestaurant = async () => {
      const userData = await firestore().collection('users').doc(id).get();
      const favoriteRestaurant = userData.data().favoriteRestaurant;
      if (!favoriteRestaurant) {
        await addUserToFirebaseWithID(
          {
            ...userData.data(),
            favoriteRestaurant: [],
          },
          auth()?.currentUser?.uid
        );
      }
    };
    checkFavoriteRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePress = async (item) => {
    setFav(!fav);
    const userData = await firestore().collection('users').doc(id).get();
    const favoriteRestaurant = userData.data().favoriteRestaurant;
    try {
      if (!fav) {
        await firestore()
          .collection('users')
          .doc(id)
          .update({
            favoriteRestaurant: [...favoriteRestaurant, { ...item }],
          });
      } else {
        const updateItem = favoriteRestaurant.filter((foodData) => foodData.id !== item.id);
        await firestore()
          .collection('users')
          .doc(id)
          .update({
            favoriteRestaurant: [...updateItem],
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('RestaurantDetail', { data })}
      style={[LayoutStyles.layoutShadowGrey, styles.card, isFullWidth && styles.cardFull]}
    >
      {/*Rating Label*/}
      <View style={[LayoutStyles.layoutCenter, LayoutStyles.layoutShadowGrey, styles.cardRating]}>
        <Text style={[TextStyles.textMain, styles.cardRatingText]}>{data.rating}</Text>
        <Image source={Images.ICON.STAR} style={styles.cardIcon} />
        <Text style={[TextStyles.textSmall, styles.cardRatingTextSmall]}>
          ({data.ratingAmount})
        </Text>
      </View>

      {/*Add to favorite*/}
      <FavoriteButton handlePress={() => handlePress(data)} isFavorite={fav} />

      {/*Thumbnail*/}
      <Image
        source={{ uri: data.image }}
        style={isFullWidth ? styles.cardThumbnailFull : styles.cardThumbnail}
      />

      {/*Content*/}
      <View style={styles.cardContent}>
        {/*Card heading*/}
        <Text style={TextStyles.h3}>{data.name}</Text>
        {/*Card inner content*/}
        <View style={styles.cardContentInner}>
          <View style={styles.cardContentItem}>
            <Image source={Images.ICON.DELIVERY} style={styles.cardContentIcon} />
            <Text style={TextStyles.textSmall}>
              {data.deliveryPrice === 0 ? 'Free delivery' : `$${data.deliveryPrice} delivery`}
            </Text>
          </View>

          <View style={styles.cardContentItem}>
            <Image source={Images.ICON.TIME} style={styles.cardContentIcon} />
            <Text style={TextStyles.textSmall}>10 minutes</Text>
          </View>
        </View>
        {/*Group of tags*/}
        <View style={styles.labelGroup}>
          {data.categories.slice(0, 3).map((cat, index) => (
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
    overflow: 'hidden',
  },
  cardThumbnail: {
    width: scaleSizeUI(266),
    height: scaleSizeUI(136, true),
    borderTopLeftRadius: Sizes.sizeModerate,
    borderTopRightRadius: Sizes.sizeModerate,
  },
  cardThumbnailFull: {
    width: '100%',
    height: scaleSizeUI(136, true),
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
  cardIcon: {
    width: Sizes.sizeModerate,
    height: Sizes.sizeModerate,
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
    lineHeight: 20,
  },
  cardRatingTextSmall: {
    marginLeft: Sizes.sizeTiny - 2,
    lineHeight: 20,
  },
  cardFull: {
    width: '87%',
  },
});
