import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//region Import styling
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
//endregion
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import MealCard from '../../components/MealCard';
import { fetchFood } from '../../features/foodSlice';
import { setSearchTheme } from '../../features/categorySlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { Images } from '../../../assets';

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
    return <MealCard key={data.id} data={data} isFavorite={!!check} />;
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
          onPress={() => {
            dispatch(setSearchTheme(0));
            navigation.navigate('Search', { defaultSortCriteria: 1 });
          }}
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
