import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import TextStyles from '../../styles/TextStyles';
import CustomButton from '../../components/CustomButton';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../features/cartSlice';

const CartConfirmRemover = ({ itemToRemove, onCancel }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.popup}>
      <Text style={TextStyles.textMain}>
        Are you sure you want to remove <Text style={styles.popupText}>{itemToRemove.name}</Text>{' '}
        from your cart?
      </Text>

      <View style={styles.popupButtonGroup}>
        <View style={styles.popupButtonWrapper}>
          <CustomButton isPrimary={false} text='Cancel' haveMinWidth={false} onPress={onCancel} />
        </View>

        <View style={styles.popupButtonWrapper}>
          <CustomButton
            text='Confirm'
            haveMinWidth={false}
            onPress={() => {
              dispatch(removeFromCart({ ...itemToRemove, quantity: itemToRemove.quantity }));
              onCancel();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CartConfirmRemover;

const styles = StyleSheet.create({
  popup: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.sizeBig,
    paddingVertical: Sizes.sizeBigH,
    borderRadius: Sizes.sizeModerate,
  },
  popupText: {
    color: Colors.secondaryDarker,
    fontFamily: 'Poppins-SemiBold',
  },
  popupButtonGroup: {
    marginTop: Sizes.sizeBigH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  popupButtonWrapper: {
    width: '48%',
    height: scaleSizeUI(50),
  },
});
