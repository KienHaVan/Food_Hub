import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../../assets';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';

const AmountButton = ({ isIncreased, handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        LayoutStyles.layoutCenter,
        styles.amountButton,
        isIncreased ? styles.increaseButton : styles.decreaseButton,
        isIncreased ? LayoutStyles.layoutShadowRed : LayoutStyles.layoutShadowGrey,
      ]}
    >
      {isIncreased ? (
        <Image source={Images.ICON.INCREASE} />
      ) : (
        <Image source={Images.ICON.DECREASE} />
      )}
    </TouchableOpacity>
  );
};

export default AmountButton;

const styles = StyleSheet.create({
  amountButton: {
    width: Sizes.sizeLarge,
    height: Sizes.sizeLarge,
    borderRadius: 99999,
  },
  decreaseButton: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
  },
  increaseButton: {
    backgroundColor: Colors.primary,
  },
});
