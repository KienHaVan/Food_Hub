import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//region Import styling
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../../assets';
import RestaurantCard from '../../components/RestaurantCard';
import { fetchRestaurants } from '../../features/restaurantSlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import HomeFeaturedSkeleton from './HomeFeaturedSkeleton';
import firestore from '@react-native-firebase/firestore';

const HomeFeatured = ({ isScreenFocused }) => {
  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const isLoading = useSelector((state) => state.restaurant.isLoading);
  const dispatch = useDispatch();
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(fetchRestaurants({ areFeatured: true }));
    }
  }, [dispatch, isScreenFocused, id]);

  const renderCard = ({ item }) => {
    return <RestaurantCard data={item} is />;
  };

  return (
    <View>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h3}>Featured Restaurants</Text>
        <TouchableOpacity
          style={LayoutStyles.layoutStretch}
          onPress={() => {
            firestore()
              .collection('food')
              .doc('SwwBUYG3ZDu1aHNNWWDo')
              .update({
                reviews: [
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Robbie Tanner',
                    date: new Date().toString(),
                    userRating: 5,
                    userReview:
                      "I've got a fetish for good food and this place gets me hot! Everything was simply decadent. The decor was unique and incredible. I'd give more than 5 stars if I could!",
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Hassan Vega',
                    date: new Date().toString(),
                    userRating: 4.5,
                    userReview:
                      'Yumm-o! The food was cooked to perfection. Everything was just so yummy. After my meal, I was knocked into a food coma. I would eat here every day if I could afford it!',
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Olivier Sanchez',
                    date: new Date().toString(),
                    userRating: 4,
                    userReview:
                      'I have been here several times before. Everything was mostly decadent. There were a lot of interesting decorations on the walls. It could have been perfect, but the staff kept looking at me funny.',
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Sam Cantu',
                    date: new Date().toString(),
                    userRating: 4,
                    userReview:
                      'I stumbled on this undiscovered gem right in our neighborhood. Make sure to save room for dessert, because that was the best part of the meal! I was happy to see how clean everything was. I docked them one star because the wait to get in was so long.',
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Elmer Arnold',
                    date: new Date().toString(),
                    userRating: 4,
                    userReview:
                      'I was pleasantly surprised. The service was good for the most part but the waitress was a bit slow. I was happy to see how clean everything was. 4 stars.',
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Logan Steele',
                    date: new Date().toString(),
                    userRating: 3.5,
                    userReview:
                      'I felt like this place was trying too hard. The service was good for the most part but the waiter was a bit tired. The ambiance gives off an earthy feel-good vibe. Satisfactory experience, will come again.',
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Danielle England',
                    date: new Date().toString(),
                    userRating: 3,
                    userReview:
                      "Decent place. The service wasn't that good and the waiter was slow. The photos of the food were appetizing and palpable, but didn't live up to the hype. The menu didn't match the one on their website. 3 stars.",
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1558898479-33c0057a5d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Kathryn Williamson',
                    date: new Date().toString(),
                    userRating: 2.5,
                    userReview:
                      "Bleh. This place is very dumpy and in a serious need of a fresh paint job. Some of my favorite dishes are no longer available. The service wasn't that good and the waiter was tired. Meh.",
                  },
                  {
                    userAvatar:
                      'https://images.unsplash.com/photo-1636041241164-3d20e98d43a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fGF2YXRhcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                    userName: 'Freddy Peters',
                    date: new Date().toString(),
                    userRating: 1.5,
                    userReview:
                      'I can summarize my visit in one word: Terrible. The entire place smelled like a sewer pipe had burst in the kitchen. Too many things on the menu look like crap, smell like crap, and taste like crap. I shouldn\'t have to pay good money to be served vegetables from a can. I wish I could put a sign out front that said "CAUTION: BIOHAZARD!"',
                  },
                ],
              });
          }}
        >
          <Text style={[TextStyles.textMain, styles.linkText]}>View All</Text>
          <Image source={Images.ICON.ARROW_RIGHT} style={styles.linkArrow} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={{ marginBottom: Sizes.sizeMassiveH + Sizes.sizeModerate }}>
          <HomeFeaturedSkeleton />
        </View>
      ) : (
        <View style={styles.cards}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={restaurants}
            keyExtractor={(res) => res.id}
            renderItem={renderCard}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={{ width: Sizes.sizeBig }}
          />
        </View>
      )}
    </View>
  );
};

export default HomeFeatured;

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
