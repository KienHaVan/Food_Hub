import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

//region Import styling
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import Sizes from '../constants/Size';
import Colors from '../constants/Color';
//endregion

const counterButtons = [
  {
    id: 0,
    text: '-',
  },
  {
    id: 1,
    text: '+',
  },
];

const Counter = () => {
  const [activeButton, setActiveButton] = useState(-1);
  const [count, setCount] = useState(0);

  const handlePress = (buttonId, amount) => {
    setActiveButton(counterButtons[buttonId].id);
    setCount(count + amount);
  };

  const calculateCount = (number) => {
    if (number < 0) {
      setCount(0);
      return '00';
    }
    if (number < 10) return `0${number}`;
    return number;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handlePress(0, -1)}
        style={[
          LayoutStyles.layoutCenter,
          activeButton === counterButtons[0].id
            ? LayoutStyles.layoutShadowRed
            : LayoutStyles.layoutShadowGrey,
          styles.counterButton,
          activeButton === counterButtons[0].id ? styles.counterButtonActive : null,
        ]}
      >
        <Text
          style={[
            TextStyles.textMain,
            styles.counterButtonInner,
            activeButton === counterButtons[0].id ? styles.counterButtonInnerActive : null,
          ]}
        >
          {counterButtons[0].text}
        </Text>
      </TouchableOpacity>

      <View style={styles.counterText}>
        <Text style={TextStyles.textMain}>{calculateCount(count)}</Text>
      </View>

      <TouchableOpacity
        onPress={() => handlePress(1, 1)}
        style={[
          LayoutStyles.layoutCenter,
          activeButton === counterButtons[1].id
            ? LayoutStyles.layoutShadowRed
            : LayoutStyles.layoutShadowGrey,
          styles.counterButton,
          activeButton === counterButtons[1].id ? styles.counterButtonActive : null,
        ]}
      >
        <Text
          style={[
            TextStyles.textMain,
            styles.counterButtonInner,
            activeButton === counterButtons[1].id ? styles.counterButtonInnerActive : null,
          ]}
        >
          {counterButtons[1].text}
        </Text>
      </TouchableOpacity>
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
