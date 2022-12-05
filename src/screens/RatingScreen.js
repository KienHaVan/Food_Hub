import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import Rating from '../components/Rating';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { height, scaleSizeUI } from '../utils/scaleSizeUI';
import Sizes from '../constants/Size';
import KeyBoardAvoidingWaraper from '../components/KeyBoardAvoidingWaraper';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const RatingScreen = ({ route }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [defaultRating, setDefaultRating] = useState(1);
  const [comment, setComment] = useState('');
  const currentDate = new Date();
  const navigation = useNavigation();
  const { foodDetail } = route.params;

  const handlePressRating = (item) => {
    setDefaultRating(item);
  };

  const handleSubmitComment = async () => {
    const formValues = {
      image: Images.IMAGES.AVATAR,
      comment: comment,
      rate: defaultRating,
      dayPost: currentDate.toLocaleDateString(),
    };
    const foodData = await firestore.collection('food').doc(foodDetail.id).get();
    const reviews = foodData.data().reviews;
    try {
      await firestore.collection('food').doc(foodDetail.id).update({
        reviews: [],
      });
    } catch (error) {
      console.log('Error: ', error);
    }
    navigation.navigate('Review', { userReview: formValues });
  };

  return (
    <KeyBoardAvoidingWaraper>
      <View style={styles.ratingScreen}>
        <View style={styles.header}>
          <Image source={Images.IMAGES.RATING_RESTAURANT} style={styles.headingImage} />
          <View style={styles.cornerButton}>
            <CornerButton
              sourceImage={Images.ICON.ARROW_LEFT}
              handlePress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.avaContainer}>
            <View style={[styles.avaBorder, LayoutStyles.layoutShadowRed]}>
              <Image source={{ uri: foodDetail.image }} style={styles.restaurantAva} />
            </View>
          </View>
        </View>
        <View style={styles.restaurantInfo}>
          <Text style={[TextStyles.h3]}>{foodDetail.name}</Text>
          <Text style={[TextStyles.textMain, styles.orderDeli]}>Order Delivered</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={[TextStyles.h3, styles.ratingText]}>Please Rate Delivery Service</Text>
          <Rating defaultRating={defaultRating} handlePress={handlePressRating} />
        </View>
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          multiline={true}
          textAlignVertical='top'
          numberOfLines={10}
          onChangeText={(text) => setComment(text)}
          style={[styles.textArea, isFocus ? styles.inputFocus : styles.inputOnBlur]}
        />
        <View style={[LayoutStyles.layoutShadowRed, styles.buttonSubmit]}>
          <CustomButton isPrimary text='SUBMIT' onPress={handleSubmitComment} />
        </View>
      </View>
    </KeyBoardAvoidingWaraper>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  ratingScreen: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 25,
    backgroundColor: Colors.white,
    height: height,
  },
  header: {
    position: 'relative',
    height: scaleSizeUI(242, true),
  },
  headingImage: {
    width: '100%',
    borderRadius: scaleSizeUI(20),
  },
  cornerButton: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  avaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    width: scaleSizeUI(104),
    height: scaleSizeUI(104),
    borderRadius: 99999,
    alignSelf: 'center',
    position: 'absolute',
    bottom: scaleSizeUI(20),
  },
  avaBorder: {
    width: scaleSizeUI(82),
    height: scaleSizeUI(82),
    borderRadius: 99999,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurantInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  restaurantAva: {
    width: '100%',
    height: '100%',
    borderRadius: 99999,
  },
  orderDeli: {
    color: Colors.green,
    marginTop: scaleSizeUI(10),
  },
  ratingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: scaleSizeUI(10),
  },
  ratingText: {
    marginBottom: scaleSizeUI(10),
    marginTop: 10,
  },
  textArea: {
    width: '100%',
    height: scaleSizeUI(168),
    borderWidth: 2,
    borderRadius: Sizes.sizeSmall,
    backgroundColor: Colors.white,
    padding: 16,
    marginVertical: 16,
    color: Colors.secondaryDarker,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
  },
  inputFocus: {
    borderColor: Colors.primary,
  },
  inputOnBlur: {
    borderColor: Colors.greyLighter,
  },
  buttonSubmit: {
    width: scaleSizeUI(248),
    height: scaleSizeUI(60, true),
    alignSelf: 'center',
    marginBottom: 8,
  },
});
