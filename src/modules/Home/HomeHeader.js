import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../../assets';
import CornerButton from '../../components/CornerButton';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';

const HomeHeader = () => {
  return (
    <View style={[LayoutStyles.layoutStretch, styles.header]}>
      <CornerButton sourceImage={Images.ICON.BURGER} />
      <TouchableOpacity style={styles.headerAddress}>
        <Text style={TextStyles.textSmall}>
          Deliver to <Image source={Images.ICON.ARROW_DOWN} />
        </Text>
        <Text style={[TextStyles.textMain, styles.addressText]}>4102 Pretty View Lane</Text>
      </TouchableOpacity>

      <TouchableOpacity style={LayoutStyles.layoutShadowRed}>
        <Image source={Images.IMAGES.AVATAR} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: Sizes.sizeLargeH,
  },
  headerAddress: {
    alignItems: 'center',
  },
  addressText: {
    color: Colors.primary,
  },
});

export default HomeHeader;
