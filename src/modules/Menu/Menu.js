import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

//region Import styling
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
//endregion

import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../assets';
import CustomButton from '../../components/CustomButton';
import { MenuItems } from '../../data/MenuItems';
import { SignOut } from '../../utils/authentication';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../../features/cartSlice';

const Menu = ({ isMenuShown, handleShowMenu }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigation = useNavigation();

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.menuItem}
        onPress={() => navigation.navigate(item.toScreen)}
      >
        <Image source={item.icon} />
        <Text style={[TextStyles.textMain, styles.menuItemText]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  const handleSignOut = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel'),
        style: 'cancel',
      },
      {
        text: 'Yes, Log out',
        onPress: () => {
          dispatch(resetCart());
          SignOut();
          navigation.navigate('Welcome');
          handleShowMenu();
        },
      },
    ]);
  };
  return (
    <View style={[styles.menu, { zIndex: isMenuShown ? 1 : -1 }]}>
      <View style={LayoutStyles.layoutShadowRed}>
        <Image source={{ uri: currentUser.photoURL }} style={styles.avatar} />
      </View>
      <Text style={TextStyles.h2} numberOfLines={2}>
        {currentUser.fullname}
      </Text>
      <Text style={TextStyles.textMain}>{currentUser.email}</Text>

      <View style={styles.menuItemGroup}>{MenuItems.map((item) => renderItem(item))}</View>

      <View style={styles.buttonContainer}>
        <CustomButton text='Log Out' iconSource={Images.ICON.LOGOUT} onPress={handleSignOut} />
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  menu: {
    width: '75%',
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
    height: 60,
    position: 'absolute',
    bottom: scaleSizeUI(120 + Sizes.sizeLargeH),
    left: Sizes.sizeBig,
  },
});
