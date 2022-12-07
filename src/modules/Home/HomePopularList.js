import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//region Import styling
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../../assets';
import CustomButton from '../../components/CustomButton';
import MealCard from '../../components/MealCard';
import { fetchFood } from '../../features/foodSlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';

const HomePopularList = ({ isScreenFocused }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const food = useSelector((state) => state.food.food);
  const id = auth()?.currentUser?.uid;
  const [favoriteFoodData, setFavoriteFoodData] = useState([]);

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(fetchFood({ areFeatured: true }));
    }
  }, [dispatch, isScreenFocused]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setFavoriteFoodData(documentSnapshot.data()?.favoriteFood || []);
      });

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCard = (data) => {
    const existingItem = favoriteFoodData.map((item) => item.id);
    const check = existingItem.includes(data.id);
    return <MealCard key={data.id} data={data} isFavorite={check ? true : false} />;
  };

  return (
    <View>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h3}>Recommended for you</Text>
        <TouchableOpacity
          style={LayoutStyles.layoutStretch}
          onPress={() => navigation.navigate('Search', { defaultSortCriteria: 1 })}
        >
          <Text style={[TextStyles.textMain, styles.linkText]}>View All</Text>
          <Image source={Images.ICON.ARROW_RIGHT} style={styles.linkArrow} />
        </TouchableOpacity>
      </View>

      {isScreenFocused && <View style={styles.cards}>{food.map((res) => renderCard(res))}</View>}

      <View style={styles.buttonContainer}>
        <CustomButton
          text='View All'
          onPress={() => navigation.navigate('Search', { defaultSortCriteria: 1 })}
        />
      </View>
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
  buttonContainer: {
    width: '70%',
    height: scaleSizeUI(55),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: Sizes.sizeBigH,
  },
});
