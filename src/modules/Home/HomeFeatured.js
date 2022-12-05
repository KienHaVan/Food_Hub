import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//region Import styling
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../../assets';
import RestaurantCard from '../../components/RestaurantCard';
import { fetchAllRestaurants } from '../../features/restaurantSlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import HomeFeaturedSkeleton from './HomeFeaturedSkeleton';

const HomeFeatured = ({ isScreenFocused }) => {
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const isLoading = useSelector((state) => state.restaurant.isLoading);
  const dispatch = useDispatch();
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(fetchAllRestaurants());
    }
  }, [dispatch, isScreenFocused, id]);

  const renderCard = ({ item }) => {
    return <RestaurantCard data={item} is />;
  };

  return (
    <View>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h3}>Featured Restaurants</Text>
        <TouchableOpacity style={LayoutStyles.layoutStretch}>
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
