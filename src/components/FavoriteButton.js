import React, { useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

//region Import styling
import LayoutStyles from '../styles/Layout';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';
//endregion

import { Images } from '../../assets';

const FavoriteButton = () => {
  const [fav, setFav] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setFav(!fav)}
      style={[
        LayoutStyles.layoutCenter,
        LayoutStyles.layoutShadowGrey,
        styles.favorite,
        fav && styles.favoriteActive,
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
