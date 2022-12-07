import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//region Import styling
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../../assets';
import RestaurantCard from '../../components/RestaurantCard';
import { fetchRestaurants } from '../../features/restaurantSlice';
import { setSearchTheme } from '../../features/categorySlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import HomeFeaturedSkeleton from './HomeFeaturedSkeleton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const HomeFeatured = ({ isScreenFocused }) => {
  const [favoriteRestaurantData, setFavoriteRestaurantData] = useState([]);
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const isLoading = useSelector((state) => state.restaurant.isLoading);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(fetchRestaurants({ areFeatured: true }));
    }
  }, [dispatch, isScreenFocused]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setFavoriteRestaurantData(documentSnapshot.data()?.favoriteRestaurant || []);
      });

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCard = ({ item }) => {
    const existingItem = favoriteRestaurantData.map((card) => card.id);
    const check = existingItem.includes(item.id);
    return <RestaurantCard data={item} key={item.id} isFavorite={check ? true : false} />;
  };

  return (
    <View>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h3}>Featured Restaurants</Text>
        <TouchableOpacity
          style={LayoutStyles.layoutStretch}
          onPress={() => {
            dispatch(setSearchTheme(1));
            navigation.navigate('Search', { defaultSortCriteria: 1 });
          }}
        >
          <Text style={[TextStyles.textMain, styles.linkText]}>View All</Text>
          <Image source={Images.ICON.ARROW_RIGHT} style={styles.linkArrow} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{ marginBottom: Sizes.sizeMassiveH + Sizes.sizeModerate }}>
          <HomeFeaturedSkeleton />
        </View>
      ) : (
        <View style={styles.cards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={restaurants}
            keyExtractor={(res) => res.id}
            renderItem={renderCard}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: Sizes.sizeBig }}
          />
        </View>
      )}
    </View>
  );
};

export default HomeFeatured;

const styles = StyleSheet.create({
  header: {
    marginBottom: Sizes.sizeModerateH,
  },
  linkText: {
    color: Colors.primary,
    marginRight: Sizes.sizeTiny,
  },
  linkArrow: {
    width: scaleSizeUI(6),
    height: scaleSizeUI(12, true),
  },
  cards: {
    marginHorizontal: -Sizes.sizeBig,
  },
});
