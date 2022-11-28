import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import AmountButton from './AmountButton';

const Counter = () => {
  const [count, setCount] = useState(1);

  const handlePress = (amount) => {
    setCount(count + amount);
  };

  const calculateCount = (number) => {
    if (number === 0) {
      setCount(1);
      return '01';
    }
    if (number < 10) return `0${number}`;
    return number;
  };

  return (
    <View style={styles.container}>
      <AmountButton handlePress={() => handlePress(-1)} />
      <View style={styles.counterText}>
        <Text style={TextStyles.textMain}>{calculateCount(count)}</Text>
      </View>
      <AmountButton isIncreased handlePress={() => handlePress(1)} />
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
    marginHorizontal: Sizes.sizeSmaller,
  },
  counterButtonInner: {
    color: Colors.primary,
    lineHeight: Sizes.sizeLargeH,
  },
  counterButtonInnerActive: {
    color: Colors.white,
  },
});
