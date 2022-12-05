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
import { useFocusEffect } from '@react-navigation/native';
import { fetchFood } from '../features/foodSlice';
import FilterPopup from '../modules/Search/FilterPopup';
import { SearchCriterias } from '../data/SearchCriterias';

const SearchScreen = ({ navigation, route }) => {
  const { category, searchTerm, defaultSortCriteria } = route.params;
  const dispatch = useDispatch();
  const foodList = useSelector((state) => state.food.food);
  const foodLoading = useSelector((state) => state.food.isLoading);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [currentCriteria, setCurrentCriteria] = useState(defaultSortCriteria || 1);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     handleFilter(defaultSortCriteria);
  //   }, [])
  // );

  useEffect(() => {
    handleFilter(defaultSortCriteria);
  }, [localSearchTerm]);

  const showFood = ({ item }) => {
    return <MealCard data={item} />;
  };

  const handleFilter = (criteria) => {
    dispatch(
      fetchFood({ category: category?.name, searchTerm: localSearchTerm, sortCriteria: criteria })
    );
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <Loader loaderVisible={foodLoading} />
      <Popup isVisible={isPopupShown} hidePopup={() => setIsPopupShown(false)}>
        <FilterPopup
          data={SearchCriterias}
          currentCriteria={currentCriteria}
          onSelect={setCurrentCriteria}
          onConfirmed={handleFilter}
          hidePopup={() => setIsPopupShown(false)}
        />
      </Popup>

      <View style={styles.backButton}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
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
          <Text style={TextStyles.textMain}>We found {foodList.length} for you</Text>
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
              placeholder='Search for food...'
              defaultValue={searchTerm}
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
