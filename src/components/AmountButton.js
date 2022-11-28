import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../../assets';
import Colors from '../constants/Color';

const AmountButton = ({ isIncreased }) => {
  return (
    <TouchableOpacity
      style={[styles.amountButton, isIncreased ? styles.increaseButton : styles.decreaseButton]}
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
    width: 30,
    height: 30,
    borderRadius: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decreaseButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  increaseButton: {
    backgroundColor: Colors.primary,
  },
});
