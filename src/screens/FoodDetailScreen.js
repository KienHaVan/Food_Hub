import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';

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
//endregion

import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const FoodDetailScreen = ({ navigation, route }) => {
  const { data } = route.params;

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
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
    paddingHorizontal: Sizes.sizeBig,
  },
  backButton: {
    position: 'absolute',
    top: Sizes.sizeLargeH,
    left: Sizes.sizeLarge,
    zIndex: 1,
  },
  foodThumbnail: {
    width: '100%',
    height: scaleSizeUI(206, true),
    marginBottom: Sizes.sizeBigH,
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
});
