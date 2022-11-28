import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Color';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const CustomButton = ({ isPrimary = true, iconSource, text = 'Click here', onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isPrimary
          ? [LayoutStyles.layoutShadowRed, styles.primaryButton]
          : [LayoutStyles.layoutShadowGrey, styles.secondaryButton],
        iconSource ? styles.buttonWithTextIcon : styles.buttonWithText,
      ]}
      onPress={onPress}
    >
      {iconSource && (
        <View style={styles.iconContainer}>
          <Image source={iconSource} style={styles.icon} />
        </View>
      )}
      <Text style={[TextStyles.h3, isPrimary ? styles.primaryButtonText : styles.secondaryButton]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    padding: 9,
    borderRadius: 28,
    minWidth: scaleSizeUI(135),
  },
  buttonWithText: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWithTextIcon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 16,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
  },
  primaryButtonText: {
    color: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.secondaryDarker,
  },
  iconContainer: {
    borderRadius: 99999,
    backgroundColor: Colors.white,
    width: 36,
    height: 36,
    marginRight: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
