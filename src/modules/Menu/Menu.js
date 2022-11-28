import React from 'react';
import { Text, View, StyleSheet, Image, FlatList, ScrollView } from 'react-native';

//region Import styling
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion

import { MenuItems } from '../../data/MenuItems';
import { Images } from '../../../assets';
import { scaleSizeUI } from '../../utils/scaleSizeUI';

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
    <ScrollView style={styles.menu}>
      <View style={LayoutStyles.layoutShadowRed}>
        <Image source={Images.IMAGES.AVATAR} style={styles.avatar} />
      </View>
      <Text style={TextStyles.h2}>Farion Wick</Text>
      <Text style={TextStyles.textMain}>farionwick@gmail.com</Text>

      <View style={styles.menuItemGroup}>{MenuItems.map((item) => renderItem(item))}</View>
    </ScrollView>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
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
});
