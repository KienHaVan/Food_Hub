import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Sizes from '../../constants/Size';
import Colors from '../../constants/Color';
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';

const HomeHeader = () => {
  return (
    <View style={[LayoutStyles.layoutStretch, styles.header]}>
      <TouchableOpacity
        style={[LayoutStyles.layoutCenter, LayoutStyles.layoutShadowGrey, styles.headerIcon]}
      >
        <Image source={require('../../../assets/icons/icon_burger.png')} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.headerAddress}>
        <Text style={TextStyles.textSmall}>
          Deliver to <Image source={require('../../../assets/icons/icon_arrow_down.png')} />
        </Text>
        <Text style={[TextStyles.textMain, styles.addressText]}>4102 Pretty View Lane</Text>
      </TouchableOpacity>

      <TouchableOpacity style={LayoutStyles.layoutShadowRed}>
        <Image source={require('../../../assets/images/image_avatar.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Sizes.sizeLargeH,
  },
  headerIcon: {
    padding: Sizes.sizeModerate,
  },
  headerAddress: {
    alignItems: 'center',
  },
  addressText: {
    color: Colors.primary,
  },
});

export default HomeHeader;
