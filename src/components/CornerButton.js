import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';

const CornerButton = ({ sourceImage, end = false, onPress = () => {} }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        LayoutStyles.layoutCenter,
        LayoutStyles.layoutShadowGrey,
        styles.button,
        end ? styles.buttonEnd : null,
      ]}
    >
      <Image source={sourceImage} />
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
  buttonEnd: {
    alignSelf: 'flex-end',
  },
});
