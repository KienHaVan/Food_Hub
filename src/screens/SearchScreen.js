import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';

import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import MealCard from '../components/MealCard';
import Loader from '../components/Loader';
import InputField from '../components/InputField';
import Popup from '../components/Popup';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFood } from '../features/foodSlice';
import { fetchRestaurants } from '../features/restaurantSlice';
import FilterPopup from '../modules/Search/FilterPopup';
import { SearchCriterias } from '../data/SearchCriterias';
import RestaurantCard from '../components/RestaurantCard';

const SearchScreen = ({ navigation, route }) => {
  const { category, searchTerm, defaultSortCriteria } = route.params;
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.food.food);
  const restaurantList = useSelector((state) => state.restaurant.restaurants);
  const foodLoading = useSelector((state) => state.food.isLoading);
  const restaurantLoading = useSelector((state) => state.restaurant.isLoading);
  const searchTheme = useSelector((state) => state.category.searchTheme);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [currentCriteria, setCurrentCriteria] = useState(defaultSortCriteria || 1);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    handleFilter(SearchCriterias[currentCriteria - 1].criteria);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSearchTerm]);

  const showFood = ({ item }) => {
    return <MealCard data={item} />;
  };

  const showRestaurant = ({ item }) => {
    return <RestaurantCard data={item} isFullWidth />;
  };

  const handleFilter = (criteria) => {
    dispatch(
      searchTheme === 0
        ? fetchFood({
            category: category?.name,
            searchTerm: localSearchTerm,
            sortCriteria: criteria,
          })
        : fetchRestaurants({
            category: category?.name,
            searchTerm: localSearchTerm,
            sortCriteria: criteria,
          })
    );
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <Loader loaderVisible={foodLoading || restaurantLoading} />
      <Popup isVisible={isPopupShown} hidePopup={() => setIsPopupShown(false)}>
        <FilterPopup
          data={SearchCriterias}
          currentCriteria={currentCriteria}
          onSelect={setCurrentCriteria}
          onConfirmed={() => handleFilter(SearchCriterias[currentCriteria - 1].criteria)}
          hidePopup={() => setIsPopupShown(false)}
        />
      </Popup>

      <View style={styles.screenHeader}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />

        {!category ? <Text style={TextStyles.h3}>Search Results</Text> : null}

        <View
          style={{
            width: Sizes.sizeLarge + Sizes.sizeSmaller,
            height: Sizes.sizeLarge + Sizes.sizeSmaller,
          }}
        />
      </View>

      {category ? (
        <View style={[LayoutStyles.layoutShadowRed, styles.searchThumbnailContainer]}>
          <Image source={{ uri: category.image }} style={styles.searchThumbnail} />
        </View>
      ) : null}

      {category ? (
        <View style={styles.searchHeader}>
          <Text style={[TextStyles.h1, styles.searchHeading]}>{category.name}</Text>
          <Text style={[TextStyles.textMain, styles.searchHeaderText]}>
            We found{' '}
            {searchTheme === 0
              ? `${foodList.length} meal(s)`
              : `${restaurantList.length} restaurant(s)`}{' '}
            for you
          </Text>
        </View>
      ) : null}

      <View
        style={[
          styles.foodList,
          { marginTop: category ? Sizes.sizeMassiveH + Sizes.sizeSmallerH : 0 },
        ]}
      >
        <View style={[LayoutStyles.layoutStretch, styles.searchFieldContainer]}>
          <View style={styles.inputContainer}>
            <InputField
              placeholder='Search for food or restaurant...'
              defaultValue={searchTerm}
              returnKeyType='search'
              onSubmitted={(event) => setLocalSearchTerm(event.nativeEvent.text)}
            />
          </View>
          <TouchableOpacity
            style={[LayoutStyles.layoutShadowGrey, LayoutStyles.layoutCenter, styles.buttonFilter]}
            onPress={() => setIsPopupShown(true)}
          >
            <Image source={Images.ICON.FILTER} style={styles.buttonFilterIcon} />
          </TouchableOpacity>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchTheme === 0 ? foodList : restaurantList}
          keyExtractor={(item) => item.id}
          renderItem={searchTheme === 0 ? showFood : showRestaurant}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: Sizes.sizeMassiveH * 2 }}
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
  screenHeader: {
    width: '95%',
    position: 'absolute',
    top: Sizes.sizeLargeH,
    marginHorizontal: Sizes.sizeModerate,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  searchHeaderText: {
    width: '60%',
  },
  foodList: {
    paddingBottom: Sizes.sizeMassiveH * 2,
  },
  searchFieldContainer: {
    marginBottom: Sizes.sizeModerateH,
    marginHorizontal: Sizes.sizeBig,
  },
  inputContainer: {
    width: '80%',
  },
  buttonFilter: {
    width: scaleSizeUI(51),
    height: scaleSizeUI(51),
    marginLeft: Sizes.sizeModerate,
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
  },
  buttonFilterIcon: {
    width: Sizes.sizeBig,
    height: Sizes.sizeBig,
  },
});
