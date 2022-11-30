import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { Images } from '../../assets';
import CornerButton from '../components/CornerButton';
import Counter from '../components/Counter';
import CustomButton from '../components/CustomButton';
import FavoriteButton from '../components/FavoriteButton';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import { addToCart } from '../features/cartSlice';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const FoodDetailScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { data } = route.params;

  const handleAddToCart = () => {
    Toast.show({
      type: 'success',
      text1: 'Added Success!',
    });
    dispatch(addToCart(data));
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
            <Counter />
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
            text='CHECK OUT'
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
