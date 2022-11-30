import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';

const CornerButton = ({ sourceImage, handlePress, ...props }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[LayoutStyles.layoutCenter, LayoutStyles.layoutShadowGrey, styles.button]}
    >
      <Image source={sourceImage} {...props} />
    </TouchableOpacity>
  );
};

export default CornerButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    width: Sizes.sizeLarge + Sizes.sizeSmaller,
    height: Sizes.sizeLarge + Sizes.sizeSmaller,
    borderRadius: Sizes.sizeSmall,
  },
});
