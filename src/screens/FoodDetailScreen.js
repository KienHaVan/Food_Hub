import React, { useEffect, useState } from 'react';
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
import FoodReviewModal from '../modules/FoodDetail/FoodReviewModal';
import { identity } from 'react-native-svg/lib/typescript/lib/Matrix2D';

const FoodDetailScreen = ({ navigation, route }) => {
  const { data, isFavorite } = route.params;
  const dispatch = useDispatch();
  const currentQuantity = useSelector((state) => state.cart.currentFoodQuantity);
  const carts = useSelector((state) => state.cart.carts);
  const currentUser = useSelector((state) => state.user.currentUser);
  const updateUserLoading = useSelector((state) => state.user.isLoading);
  const [showReview, setShowReview] = useState(false);
  const [addon, setAddon] = useState({ name: '_', price: 0 });

  //When new data is passed into the screen, the quantity of the item is reset
  useEffect(() => {
    dispatch(resetCurrentQuantity());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  //When the cart is changed => update user in firestore
  //TODO: Bug here!!! navigating to this screen also calls API
  useEffect(() => {
    dispatch(updateUser({ userId: currentUser.id, newData: { carts } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  //Handle adding to cart action after pressing Add to cart
  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: currentQuantity, chosenAddon: addon }));
    setTimeout(() => {
      navigation.goBack();
    }, 0);
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <FoodReviewModal
        isModalShown={showReview}
        data={data.reviews}
        hideReview={() => setShowReview(false)}
      />

      <Loader loaderVisible={updateUserLoading} />

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
            <TouchableOpacity
              style={styles.ratingLink}
              onPress={() => navigation.navigate('Review', { foodDetail: data })}
            >
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

          <FoodAddonList data={data?.addons} currentAddon={addon} onSelect={setAddon} />
        </View>
      </ScrollView>

      <View style={LayoutStyles.layoutCenter}>
        <View style={styles.buttonContainer}>
          <CustomButton
            text={`ADD TO CART ($${formatPrice(data.price * currentQuantity + addon.price)})`}
            iconSource={Images.ICON.CART}
            onPress={handleAddToCart}
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
    width: scaleSizeUI(235),
    height: scaleSizeUI(60, true),
  },
});
