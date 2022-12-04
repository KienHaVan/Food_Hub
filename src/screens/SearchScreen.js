import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';

import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';

import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import MealCard from '../components/MealCard';
import Loader from '../components/Loader';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchFood } from '../features/foodSlice';

const SearchScreen = ({ navigation, route }) => {
  const { category } = route.params;
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.food.food);
  const foodLoading = useSelector((state) => state.food.isLoading);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchFood([false, category.name]));
    }, [])
  );

  const showFood = ({ item }) => {
    return <MealCard data={item} />;
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
      <View style={[LayoutStyles.layoutShadowRed, styles.searchThumbnailContainer]}>
        <Image source={{ uri: category.image }} style={styles.searchThumbnail} />
      </View>

      <View style={styles.searchHeader}>
        <Text style={[TextStyles.h1, styles.searchHeading]}>{category.name}</Text>
        <Text style={TextStyles.textMain}>We found {foodList.length} for you</Text>
      </View>

      <View style={styles.foodList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={foodList}
          keyExtractor={(item) => item.id}
          renderItem={showFood}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: Sizes.sizeMassiveH * 3 }}
        />
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screen: {
    paddingTop: Sizes.sizeMassiveH * 2,
  },
  backButton: {
    position: 'absolute',
    top: Sizes.sizeLargeH,
    left: Sizes.sizeModerate,
    zIndex: 1,
  },
  searchThumbnailContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: 1000,
    overflow: 'hidden',
  },
  searchThumbnail: {
    width: scaleSizeUI(200),
    height: scaleSizeUI(244, true),
  },
  searchHeader: {
    width: '70%',
    marginLeft: Sizes.sizeBig,
  },
  searchHeading: {
    color: Colors.primary,
    lineHeight: 65,
  },
  foodList: {
    marginTop: Sizes.sizeMassiveH + Sizes.sizeLargeH,
  },
});
