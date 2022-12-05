import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import LayoutStyles from '../styles/Layout';
import { Images } from '../../assets';
import { RadioButton } from 'react-native-paper';
import Color from '../constants/Color';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';
const CheckoutPaymentCard = ({
  iconURL = Images.ICON.CASH,
  text = 'Cash Money',
  index,
  checked,
  setChecked,
  showingRadio = true,
}) => {
  return (
    <TouchableOpacity
      style={[LayoutStyles.layoutShadowGrey, styles.childrenContainer]}
      onPress={() => setChecked(index)}
    >
      <View style={styles.childrenContainerTop}>
        <Image source={iconURL} style={styles.childrenIcon} />
        <Text style={TextStyles.textMain}>{text}</Text>
      </View>
      {showingRadio && (
        <RadioButton
          value={index}
          status={checked === index ? 'checked' : 'unchecked'}
          color={Color.primary}
          onPress={() => setChecked(index)}
        />
      )}
    </TouchableOpacity>
  );
};

export default CheckoutPaymentCard;

const styles = StyleSheet.create({
  childrenContainer: {
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scaleSizeUI(24),
    marginBottom: scaleSizeUI(24, true),
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    height: 76,
  },
  childrenContainerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childrenIcon: {
    width: 50,
    height: 50,
    marginRight: 12,
  },
});
