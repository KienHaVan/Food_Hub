import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';

import { Images } from '../../assets';

const FavoriteButton = ({ handlePress, isFavorite }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        LayoutStyles.layoutCenter,
        LayoutStyles.layoutShadowGrey,
        styles.favorite,
        isFavorite && styles.favoriteActive,
      ]}
    >
      <Image source={Images.ICON.HEART} />
    </TouchableOpacity>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  favorite: {
    position: 'absolute',
    top: Sizes.sizeSmallerH,
    right: Sizes.sizeSmaller,
    zIndex: 1,
    padding: Sizes.sizeSmaller,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  favoriteActive: {
    backgroundColor: Colors.primary,
  },
});
