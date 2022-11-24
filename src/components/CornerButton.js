import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';

const CornerButton = ({ sourceImage }) => {
  return (
    <TouchableOpacity
      style={[LayoutStyles.layoutCenter, LayoutStyles.layoutShadowGrey, styles.headerIcon]}
    >
      <Image source={sourceImage} />
    </TouchableOpacity>
  );
};

export default CornerButton;

const styles = StyleSheet.create({
  headerIcon: {
    padding: Sizes.sizeModerate,
  },
});
