import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import Colors from '../constants/Color';
import TextStyles from '../styles/TextStyles';

const ReviewScreen = ({ route }) => {
  const { userReview } = route.params;
  const navigation = useNavigation();

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
        <View style={styles.commentContainer}>
          <View style={styles.userInfo}>
            <View>
              <Image source={userReview.image} style={styles.avatar} />
              <View style={styles.rating}>
                <Text style={[TextStyles.textSmall, styles.ratePoint]}>{userReview.rate}.0</Text>
              </View>
            </View>
            <View>
              <Text style={TextStyles.h3}>Alyce Lambo</Text>
              <Text style={TextStyles.textSmall}>{userReview.dayPost}</Text>
            </View>
            <TouchableOpacity style={styles.option}>
              <Image source={Images.ICON.OPTIONS} />
            </TouchableOpacity>
          </View>
          <Text style={[TextStyles.h3, styles.comment]}>{userReview.comment}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReviewScreen;

const styles = StyleSheet.create({
  reviewScreen: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 37,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  space: {
    width: 40,
    height: 40,
  },
  commentContainer: {
    marginBottom: 30,
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
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
    fontSize: 15,
    marginTop: 20,
  },
});
