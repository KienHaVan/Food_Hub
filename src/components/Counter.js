import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import AmountButton from './AmountButton';
import { useDispatch } from 'react-redux';
import { resetCurrentQuantity } from '../features/cartSlice';

const Counter = ({ defaultValue, onIncrease, onDecrease }) => {
  const dispatch = useDispatch();

  const calculateCount = (number) => {
    if (number === 0) {
      dispatch(resetCurrentQuantity());
      return '01';
    }
    if (number < 10) {
      return `0${number}`;
    }
    return number;
  };

  return (
    <View style={styles.container}>
      <AmountButton handlePress={onDecrease} />
      <View style={styles.counterText}>
        <Text style={[TextStyles.textMain, styles.counterText]}>
          {calculateCount(defaultValue)}
        </Text>
      </View>
      <AmountButton isIncreased handlePress={onIncrease} />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  counterButton: {
    width: Sizes.sizeLarge,
    height: Sizes.sizeLarge,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  counterButtonActive: {
    backgroundColor: Colors.primary,
  },
  counterText: {
    width: Sizes.sizeLarge,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.secondaryDarker,
  },
  counterButtonInner: {
    color: Colors.primary,
    lineHeight: Sizes.sizeLargeH,
  },
  counterButtonInnerActive: {
    color: Colors.white,
  },
});
