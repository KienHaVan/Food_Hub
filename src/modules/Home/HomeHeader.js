import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Images } from '../../../assets';
import CornerButton from '../../components/CornerButton';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';

const HomeHeader = ({ handleShowMenu }) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.currentUserFirestoreData);
  return (
    <View style={[LayoutStyles.layoutStretch, styles.header]}>
      <CornerButton sourceImage={Images.ICON.BURGER} handlePress={handleShowMenu} />
      <TouchableOpacity style={styles.headerAddress}>
        <Text style={TextStyles.textSmall}>
          Deliver to <Image source={Images.ICON.ARROW_DOWN} />
        </Text>
        <Text style={[TextStyles.textMain, styles.addressText]}>4102 Pretty View Lane</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[LayoutStyles.layoutShadowRed, styles.avatar]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image source={{ uri: currentUser?.photoURL }} style={styles.avatar} />
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
  avatar: {
    width: Sizes.sizeLarge + Sizes.sizeSmaller,
    height: Sizes.sizeLarge + Sizes.sizeSmaller,
    borderRadius: Sizes.sizeSmall,
  },
});

export default HomeHeader;
