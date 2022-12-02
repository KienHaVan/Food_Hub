import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';

//region Import styling
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
//endregion

import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCategories, toggleModal } from '../../features/categorySlice';
import HomeCategoriesSkeleton from './HomeCategoriesSkeleton';

const HomeCategories = ({ isScreenFocused }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector((state) => state.category.categories);
  const isLoading = useSelector((state) => state.category.isLoading);
  const isModalShown = useSelector((state) => state.category.isModalShown);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (isScreenFocused && !isModalShown) {
      dispatch(fetchCategories(true));
    }
  }, [isScreenFocused, isModalShown]);

  const handlePress = (item) => {
    navigation.navigate('Search', { category: item });
    setActiveCard(item.id);
  };

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={[
          styles.card,
          activeCard === item.id ? LayoutStyles.layoutShadowRed : LayoutStyles.layoutShadowGrey,
          activeCard === item.id ? styles.cardActive : null,
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <Text
          numberOfLines={1}
          style={[TextStyles.textSmall, activeCard === item.id && TextStyles.textWhite]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {isLoading ? (
        <HomeCategoriesSkeleton />
      ) : (
        <FlatList
          style={styles.cardList}
          contentContainerStyle={{ alignItems: 'center' }}
          data={categories}
          keyExtractor={(cat) => cat.id}
          renderItem={renderCard}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListHeaderComponent={
            <TouchableOpacity onPress={() => dispatch(toggleModal())}>
              <Text style={[TextStyles.textMain, styles.listLink]}>View All</Text>
            </TouchableOpacity>
          }
          ListHeaderComponentStyle={{
            width: '8%',
            marginHorizontal: Sizes.sizeBig,
          }}
        />
      )}
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  cardList: {
    marginHorizontal: -Sizes.sizeBig,
  },
  listLink: {
    textAlign: 'center',
    color: Colors.primary,
  },
  card: {
    minWidth: scaleSizeUI(70),
    backgroundColor: Colors.white,
    borderRadius: 100,
    marginTop: Sizes.sizeLargeH,
    marginBottom: Sizes.sizeMassiveH,
    marginRight: Sizes.sizeModerate,
    alignItems: 'center',
    paddingTop: Sizes.sizeTinyH,
    paddingHorizontal: Sizes.sizeTiny,
    paddingBottom: Sizes.sizeModerateH,
  },
  cardActive: {
    backgroundColor: Colors.primary,
  },
  cardImage: {
    width: scaleSizeUI(60),
    height: scaleSizeUI(60),
    borderRadius: 100,
    marginBottom: Sizes.sizeSmallerH,
  },
});
