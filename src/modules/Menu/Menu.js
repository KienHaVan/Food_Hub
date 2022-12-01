import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView, Dimensions } from 'react-native';

//region Import styling
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion

import { MenuItems } from '../../data/MenuItems';
import { Images } from '../../../assets';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import CustomButton from '../../components/CustomButton';

const Menu = () => {
  const renderItem = (item) => {
    return (
      <View key={item.id} style={styles.menuItem}>
        <Image source={item.icon} />
        <Text style={[TextStyles.textMain, styles.menuItemText]}>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.menu}>
      <View style={LayoutStyles.layoutShadowRed}>
        <Image source={Images.IMAGES.AVATAR} style={styles.avatar} />
      </View>
      <Text style={TextStyles.h2}>Farion Wick</Text>
      <Text style={TextStyles.textMain}>farionwick@gmail.com</Text>

      <View style={styles.menuItemGroup}>{MenuItems.map((item) => renderItem(item))}</View>

      <View style={styles.buttonContainer}>
        <CustomButton text='Log Out' iconSource={Images.ICON.LOGOUT} />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    height: Dimensions.get('screen').height,
    paddingVertical: Sizes.sizeLargeH,
    paddingHorizontal: Sizes.sizeBig,
  },
  avatar: {
    width: scaleSizeUI(90),
    height: scaleSizeUI(90),
    borderRadius: 100,
    marginBottom: Sizes.sizeBigH,
  },
  menuItemGroup: {
    marginTop: Sizes.sizeMassiveH,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: Sizes.sizeLargeH,
  },
  menuItemText: {
    marginLeft: Sizes.sizeSmall,
  },
  buttonContainer: {
    width: scaleSizeUI(117),
    height: scaleSizeUI(60, true),
    position: 'absolute',
    bottom: scaleSizeUI(120 + Sizes.sizeLargeH),
    left: Sizes.sizeBig,
  },
});
