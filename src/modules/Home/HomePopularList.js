import React, { useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

//region Import styling
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
//endregion

import MealCard from '../../components/MealCard';

import { Images } from '../../../assets';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFood } from '../../features/foodSlice';
import { useNavigation } from '@react-navigation/native';

const HomePopularList = ({ isScreenFocused }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const food = useSelector((state) => state.food.food);

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(fetchFood({ areFeatured: true }));
    }
  }, [dispatch, isScreenFocused]);

  const renderCard = (data) => {
    return <MealCard key={data.id} data={data} />;
  };

  return (
    <View>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h3}>Recommended for you</Text>
        <TouchableOpacity
          style={LayoutStyles.layoutStretch}
          onPress={() => navigation.navigate('Search', { defaultSortCriteria: 'rating' })}
        >
          <Text style={[TextStyles.textMain, styles.linkText]}>View All</Text>
          <Image source={Images.ICON.ARROW_RIGHT} style={styles.linkArrow} />
        </TouchableOpacity>
      </View>

      <View style={styles.cards}>{food.map((res) => renderCard(res))}</View>
    </View>
  );
};

export default HomePopularList;

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
