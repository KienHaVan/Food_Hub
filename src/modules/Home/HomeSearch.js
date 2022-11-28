import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Images } from '../../../assets';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import InputField from '../../components/InputField';
import { scaleSizeUI } from '../../utils/scaleSizeUI';

const HomeSearch = () => {
  return (
    <View style={styles.homeSearch}>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='Find for food or restaurant...'
          isPassword={false}
          preIcon={Images.ICON.SEARCH}
        />
      </View>
      <TouchableOpacity
        style={[LayoutStyles.layoutShadowGrey, LayoutStyles.layoutCenter, styles.buttonFilter]}
      >
        <Image source={Images.ICON.FILTER} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  homeSearch: {
    flex: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    width: '80%',
  },
  buttonFilter: {
    width: scaleSizeUI(51),
    height: scaleSizeUI(51),
    marginLeft: Sizes.sizeModerate,
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
  },
});
