import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import Colors from '../constants/Color';
import TextStyles from '../styles/TextStyles';

const ReviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { foodDetail } = route.params;
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('food')
      .doc(foodDetail.id)
      .onSnapshot((documentSnapshot) => {
        setReviewData(documentSnapshot.data().reviews || []);
      });
    return () => subscriber();
  }, [foodDetail]);

  return (
    <View style={styles.reviewScreen}>
      <ScrollView>
        <View style={styles.header}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.goBack()}
          />
          <Text style={TextStyles.h3}>Reviews</Text>
          <View style={styles.space} />
        </View>
        <View>
          {reviewData.map((item, index) => (
            <View style={styles.commentContainer} key={index.toString()}>
              <View style={styles.userInfo}>
                <View>
                  <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
                  <View style={styles.rating}>
                    <Text style={[TextStyles.textSmall, styles.ratePoint]}>{item.rating}.0</Text>
                  </View>
                </View>
                <View>
                  <Text style={TextStyles.h3}>{item.userName}</Text>
                  <Text style={TextStyles.textSmall}>{item.date}</Text>
                </View>
                <TouchableOpacity style={styles.option}>
                  <Image source={Images.ICON.OPTIONS} />
                </TouchableOpacity>
              </View>
              <Text style={[TextStyles.textMain, styles.comment]}>{item.userReview}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  reviewScreen: {
    flex: 1,
    // paddingHorizontal: 26,
    // paddingTop: 37,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 40,
    marginHorizontal: 26,
  },
  space: {
    width: 40,
    height: 40,
  },
  commentContainer: {
    marginBottom: 30,
    marginHorizontal: 26,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 99999,
    position: 'relative',
    marginRight: 20,
  },
  rating: {
    width: 20,
    height: 20,
    borderRadius: 99999,
    backgroundColor: Colors.yellow,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    bottom: 5,
  },
  ratePoint: {
    color: Colors.white,
    fontSize: 8,
  },
  option: {
    position: 'absolute',
    right: 0,
    width: 20,
    height: 20,
  },
  comment: {
    marginTop: 16,
  },
});
