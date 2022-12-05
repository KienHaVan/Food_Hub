import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  decreaseCurrentQuantity,
  increaseCurrentQuantity,
  resetCurrentQuantity,
} from '../features/cartSlice';
import { updateUser } from '../features/userSlice';
import Toast from 'react-native-toast-message';

//region Import styling
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
//endregion

//region Import components
import CornerButton from '../components/CornerButton';
import Counter from '../components/Counter';
import CustomButton from '../components/CustomButton';
//endregion

import { Images } from '../../assets';
import FavoriteButton from '../components/FavoriteButton';
import { formatPrice } from '../utils/formatter';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import FoodAddonList from '../modules/FoodDetail/FoodAddonList';
import Loader from '../components/Loader';

const FoodDetailScreen = ({ navigation, route }) => {
  const { data, isFavorite } = route.params;
  const dispatch = useDispatch();
  const currentQuantity = useSelector((state) => state.cart.currentFoodQuantity);
  const carts = useSelector((state) => state.cart.carts);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updateUserLoading = useSelector((state) => state.user.isLoading);

  //When new data is passed into the screen, the quantity of the item is reset
  useEffect(() => {
    dispatch(resetCurrentQuantity());
  }, [data, dispatch]);

  //When the cart is changed => update user in firestore
  //TODO: Bug here!!! navigating to this screen also calls API
  useEffect(() => {
    dispatch(updateUser({ userId: currentUser.id, newData: { carts } }));
  }, [carts]);

  //Handle adding to cart action after pressing Add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: currentQuantity }));
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <Loader loaderVisible={updateUserLoading} />

      <View style={{ height: '100%' }}>
        <View style={styles.backButton}>
          <CornerButton
            sourceImage={Images.ICON.ARROW_LEFT}
            handlePress={() => navigation.goBack()}
          />
        </View>

        <ImageBackground
          source={{ uri: data.image }}
          style={styles.foodThumbnail}
          imageStyle={styles.foodThumbnailImage}
        >
          <FavoriteButton isFavorite={isFavorite} />
        </ImageBackground>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.contentWrapper}>
            <Text style={TextStyles.h2}>{data.name}</Text>

            <View style={styles.rating}>
              <Image source={Images.ICON.STAR_LARGE} style={styles.ratingIcon} />
              <Text style={[TextStyles.textMain, styles.ratingText]}>{data.rating}</Text>
              <Text style={TextStyles.textMain}>({data.ratingAmount})</Text>
              <TouchableOpacity style={styles.ratingLink}>
                <Text style={[TextStyles.textMain, styles.ratingLinkText]}>See Reviews</Text>
              </TouchableOpacity>
            </View>

            <View style={LayoutStyles.layoutStretch}>
              <Text style={[TextStyles.textMain, styles.foodPrice]}>
                $<Text style={[TextStyles.h2, styles.foodPrice]}>{formatPrice(data.price)}</Text>
              </Text>

              <Counter
                defaultValue={currentQuantity}
                onIncrease={() => dispatch(increaseCurrentQuantity(currentQuantity))}
                onDecrease={() => dispatch(decreaseCurrentQuantity(currentQuantity))}
              />
            </View>

            <Text style={TextStyles.textMain}>{data.description}</Text>

            <FoodAddonList data={data?.addons} />
          </View>
        </ScrollView>

        <View style={LayoutStyles.layoutCenter}>
          <View style={styles.buttonContainer}>
            <CustomButton
              text='ADD TO CART'
              iconSource={Images.ICON.CART}
              onPress={handleAddToCart}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
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
