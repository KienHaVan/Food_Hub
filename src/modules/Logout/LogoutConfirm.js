import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import TextStyles from '../../styles/TextStyles';
import CustomButton from '../../components/CustomButton';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
const LogoutConfirm = ({ onLogout, onCancel }) => {
  return (
    <View style={styles.popup}>
      <Text style={TextStyles.textMain}>Are you sure you want to log out?</Text>

      <View style={styles.popupButtonGroup}>
        <View style={styles.popupButtonWrapper}>
          <CustomButton isPrimary={false} text='Cancel' haveMinWidth={false} onPress={onCancel} />
        </View>

        <View style={styles.popupButtonWrapper}>
          <CustomButton text='Logout' haveMinWidth={false} onPress={onLogout} />
        </View>
      </View>
    </View>
  );
};

export default LogoutConfirm;

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
