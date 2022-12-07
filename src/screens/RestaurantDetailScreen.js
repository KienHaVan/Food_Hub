import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import Loader from '../components/Loader';
import CornerButton from '../components/CornerButton';
import FavoriteButton from '../components/FavoriteButton';
import { Images } from '../../assets';
import { useSelector, useDispatch } from 'react-redux';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import { fetchFoodInRestaurant } from '../features/foodSlice';

const RestaurantDetailScreen = ({ navigation, route }) => {
  const { data, isFavorite } = route.params;
  const dispatch = useDispatch();
  const foodLoading = useSelector((state) => state.food.isLoading);
  const food = useSelector((state) => state.food.food);

  useEffect(() => {
    dispatch(fetchFoodInRestaurant(data.food));
  }, [data, dispatch]);

  const renderFoodCard = (food) => {
    return (
      <TouchableOpacity
        key={food.id}
        style={styles.foodCard}
        onPress={() => navigation.navigate('FoodDetail', { data: food })}
      >
        <Image source={{ uri: food.image }} style={styles.foodCardImage} />
        <Text numberOfLines={2} style={[TextStyles.textMain, styles.foodCardText]}>
          {food.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <Loader loaderVisible={foodLoading} />

      <View style={styles.backButton}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />
      </View>

      <FavoriteButton isFavorite={isFavorite} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{ uri: data.image }} style={styles.screenThumbnail} />

        <View style={[LayoutStyles.layoutShadowGrey, styles.restaurantInfo]}>
          <Text style={[TextStyles.h2, styles.restaurantHeading]}>{data.name}</Text>
          <View style={styles.restaurantRating}>
            <Image source={Images.ICON.STAR_LARGE} style={styles.restaurantRatingIcon} />
            <Text style={[TextStyles.textMain, styles.restaurantRatingText]}>{data.rating}</Text>
            <Text style={TextStyles.textMain}>({data.ratingAmount})</Text>
          </View>
          <View style={styles.restaurantTags}>
            {data.categories.map((item, index) => (
              <View key={index} style={[LayoutStyles.layoutCenter, styles.restaurantTag]}>
                <Text style={[TextStyles.textSmall, styles.restaurantTagText]}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.restaurantFoodList}>{food.map((item) => renderFoodCard(item))}</View>
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: Sizes.sizeLargeH,
    left: Sizes.sizeLarge,
    zIndex: 1,
  },
  screenThumbnail: {
    width: '100%',
    height: scaleSizeUI(200),
  },
  restaurantInfo: {
    width: '85%',
    marginLeft: 'auto',
    marginRight: 'auto',
    top: -Sizes.sizeMassiveH,
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
    paddingVertical: Sizes.sizeSmallH,
    paddingHorizontal: Sizes.sizeModerate,
    alignItems: 'center',
  },
  restaurantHeading: {
    textAlign: 'center',
    marginBottom: Sizes.sizeModerateH,
  },
  restaurantRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.sizeModerateH,
  },
  restaurantRatingIcon: {
    width: Sizes.sizeModerate,
    height: Sizes.sizeModerate,
    marginRight: Sizes.sizeSmaller,
  },
  restaurantRatingText: {
    color: Colors.secondaryDarker,
    marginRight: Sizes.sizeSmaller,
  },
  restaurantTags: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  restaurantTag: {
    marginRight: Sizes.sizeSmaller,
    marginBottom: Sizes.sizeSmallerH,
    padding: Sizes.sizeSmaller,
    borderRadius: Sizes.sizeSmaller,
    backgroundColor: Colors.greyLighter,
  },
  restaurantTagText: {
    textTransform: 'uppercase',
  },
  restaurantFoodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal: Sizes.sizeBig,
  },
  foodCard: {
    width: '48%',
    marginBottom: Sizes.sizeBigH,
  },
  foodCardImage: {
    width: '100%',
    borderRadius: Sizes.sizeModerate,
    height: scaleSizeUI(100),
  },
  foodCardText: {
    marginTop: Sizes.sizeSmallH,
    color: Colors.secondaryDarker,
  },
});
