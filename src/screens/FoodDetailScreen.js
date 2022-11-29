import React, { useEffect, useState } from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  increaseCurrentQuantity,
  decreaseCurrentQuantity,
  resetCurrentQuantity,
  addToCart,
} from '../features/cartSlice';
import Toast from 'react-native-toast-message';

//region Import styling
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
//endregion

//region Import components
import CornerButton from '../components/CornerButton';
import FavoriteButton from '../components/FavoriteButton';
import Counter from '../components/Counter';
import CustomButton from '../components/CustomButton';
//endregion

import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const FoodDetailScreen = ({ navigation, route }) => {
  const { data } = route.params;
  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const currentQuantity = useSelector((state) => state.cart.currentFoodQuantity);

  //When new data is passed into the screen, the quantity of the item is reset
  useEffect(() => {
    dispatch(resetCurrentQuantity());
  }, [data]);

  const handleAddToCart = () => {
    Toast.show({
      type: 'success',
      text1: 'Added Success!',
    });
    dispatch(addToCart({ ...data, quantity: currentQuantity }));
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <View style={styles.backButton}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />
      </View>

      <ImageBackground
        source={data.image}
        style={styles.foodThumbnail}
        imageStyle={styles.foodThumbnailImage}
      >
        <FavoriteButton />
      </ImageBackground>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          <Text style={TextStyles.h2}>{data.name}</Text>

          <View style={styles.rating}>
            <Image source={Images.ICON.STAR_LARGE} style={styles.ratingIcon} />
            <Text style={[TextStyles.textMain, styles.ratingText]}>{data.ratings}</Text>
            <Text style={TextStyles.textMain}>({data.ratingCount})</Text>
            <TouchableOpacity style={styles.ratingLink}>
              <Text style={[TextStyles.textMain, styles.ratingLinkText]}>See Reviews</Text>
            </TouchableOpacity>
          </View>

          <View style={LayoutStyles.layoutStretch}>
            <Text style={[TextStyles.textMain, styles.foodPrice]}>
              $<Text style={[TextStyles.h2, styles.foodPrice]}>{data.price}</Text>
            </Text>

            <Counter
              defaultValue={currentQuantity}
              onIncrease={() => dispatch(increaseCurrentQuantity(currentQuantity))}
              onDecrease={() => dispatch(decreaseCurrentQuantity(currentQuantity))}
            />
          </View>

          <Text style={TextStyles.textMain}>{data.description}</Text>
        </View>
      </ScrollView>

      <View style={LayoutStyles.layoutCenter}>
        <View style={[styles.buttonContainer, { marginRight: Sizes.sizeSmall }]}>
          <CustomButton
            text='ADD TO CART'
            iconSource={Images.ICON.CART}
            onPress={handleAddToCart}
          />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            text={`CHECK OUT (${totalQuantity >= 100 ? '99+' : totalQuantity})`}
            isPrimary={false}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>
      </View>
    </View>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
    //paddingHorizontal: Sizes.sizeBig,
  },
  contentWrapper: {
    marginHorizontal: Sizes.sizeBig,
  },
  backButton: {
    position: 'absolute',
    top: Sizes.sizeLargeH,
    left: Sizes.sizeLarge,
    zIndex: 1,
  },
  foodThumbnail: {
    height: scaleSizeUI(206, true),
    marginBottom: Sizes.sizeBigH,
    marginHorizontal: Sizes.sizeBig,
  },
  foodThumbnailImage: {
    borderRadius: Sizes.sizeModerate,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.sizeModerateH,
  },
  ratingIcon: {
    width: Sizes.sizeModerate,
    height: Sizes.sizeModerate,
    marginRight: Sizes.sizeSmaller,
  },
  ratingText: {
    color: Colors.secondary,
    marginRight: Sizes.sizeTiny,
  },
  ratingLink: {
    marginLeft: Sizes.sizeSmaller,
  },
  ratingLinkText: {
    color: Colors.primary,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    lineHeight: Sizes.sizeModerateH + Sizes.sizeTinyH,
  },
  foodPrice: {
    color: Colors.primary,
  },
  buttonContainer: {
    width: scaleSizeUI(167),
    height: scaleSizeUI(60, true),
  },
});
