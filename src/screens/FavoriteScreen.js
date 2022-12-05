import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CornerButton from '../components/CornerButton';
import { Images } from '../../assets';
import Colors from '../constants/Color';
import TextStyles from '../styles/TextStyles';
import { useState } from 'react';
import MealCard from '../components/MealCard';
import { useSelector } from 'react-redux';
import Sizes from '../constants/Size';
import { useNavigation } from '@react-navigation/native';
import RestaurantCard from '../components/RestaurantCard';

const buttons = [
  { id: 1, name: 'Food items' },
  { id: 2, name: 'Restaurants' },
];
const FavoriteScreen = () => {
  const [currentButton, setCurrentButon] = useState(1);
  const [isFoodItem, setIsFoodItems] = useState(false);
  const navigation = useNavigation();
  const { favoriteFoodList, favoriteRestaurantList } = useSelector((state) => state.user);

  const handlePress = (item) => {
    setCurrentButon(item.id);
    if (item.name === 'Food items') {
      setIsFoodItems(true);
    } else {
      setIsFoodItems(false);
    }
  };

  const showFood = ({ item }) => {
    return (
      <View>
        {isFoodItem ? (
          <View style={styles.cardFood}>
            <MealCard data={item} isFavorite={true} />
          </View>
        ) : (
          <View style={styles.cardRestaurant}>
            <RestaurantCard data={item} isFavorite={true} />
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack('HomeStack')}
        />
        <Text style={TextStyles.h3}>Favorites</Text>
        <Image source={Images.IMAGES.AVATAR} />
      </View>
      <View style={styles.buttonContainer}>
        {buttons.map((item) => (
          <TouchableOpacity
            style={[styles.button, currentButton === item.id ? styles.buttonActive : null]}
            key={item.id}
            onPress={() => handlePress(item)}
          >
            <Text
              style={[
                TextStyles.textMain,
                currentButton === item.id ? styles.buttonTextActive : styles.buttonText,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.foodList}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={isFoodItem ? favoriteFoodList : favoriteRestaurantList}
          keyExtractor={(item) => item.id}
          renderItem={showFood}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: Sizes.sizeMassiveH * 3 }}
        />
      </View>
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 36,
    paddingHorizontal: 26,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderWidth: 1,
    borderColor: Colors.greyLighter,
    borderRadius: 28,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginTop: 30,
  },
  button: {
    borderRadius: 24,
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.primary,
  },
  buttonTextActive: {
    color: Colors.white,
  },
  buttonActive: {
    backgroundColor: Colors.primary,
  },
  foodList: {
    marginTop: 32,
    overflow: 'hidden',
  },
  cardFood: {
    marginHorizontal: -Sizes.sizeBig,
  },
  cardRestaurant: {
    width: '100%',
  },
});
