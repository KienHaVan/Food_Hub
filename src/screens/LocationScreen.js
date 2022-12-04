import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomButton from '../components/CustomButton';
import { useDispatch } from 'react-redux';
import { addFood } from '../features/foodSlice';
import { addRestaurant } from '../features/restaurantSlice';
import { generateRandomRating, generateRandomRatingAmount } from '../utils/generateRandom';

const LocationScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <CustomButton
          text='Generate Restaurant'
          onPress={() =>
            dispatch(
              addRestaurant({
                name: 'Pizza Hut',
                rating: generateRandomRating(3, 4),
                ratingAmount: generateRandomRatingAmount(800, 8000),
                deliveryPrice: 2,
                categories: [],
                food: [],
                image:
                  'https://images.deliveryhero.io/image/fd-sg/LH/xvqq-hero.jpg?width=1200&height=300&quality=45',
              })
            )
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          text='Generate Food'
          onPress={() => {
            dispatch(
              addFood({
                name: '',
                categories: [],
                description: '',
                image: '',
                price: 0,
                rating: generateRandomRating(3, 4),
                ratingAmount: generateRandomRatingAmount(60, 1000),
              })
            );
          }}
        />
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    width: '80%',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
