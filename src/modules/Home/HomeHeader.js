import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Images } from '../../../assets';
import CornerButton from '../../components/CornerButton';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useState } from 'react';

const HomeHeader = ({ handleShowMenu }) => {
  const navigation = useNavigation();
  const [userAddress, setUserAddress] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setUserAddress(documentSnapshot.data().address || '');
        setPhotoURL(documentSnapshot.data().photoURL || '');
      });
    return () => subscriber();
  }, [id]);

  const { currentUser } = useSelector((state) => state.user);
  return (
    <View style={[LayoutStyles.layoutStretch, styles.header]}>
      <CornerButton sourceImage={Images.ICON.BURGER} handlePress={handleShowMenu} />
      <TouchableOpacity style={styles.headerAddress}>
        <Text style={TextStyles.textSmall}>
          Deliver to <Image source={Images.ICON.ARROW_DOWN} />
        </Text>
        <Text style={[TextStyles.textMain, styles.addressText]}>{userAddress}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[LayoutStyles.layoutShadowRed, styles.avatar]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image source={{ uri: photoURL || currentUser.photoURL }} style={styles.avatar} />
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
