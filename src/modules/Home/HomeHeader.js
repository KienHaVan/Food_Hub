import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
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

const HomeHeader = ({ handleShowMenu }) => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.currentUserFirestoreData);
  const [userAddress, setUserAddress] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const id = auth()?.currentUser?.uid;

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setUserAddress(documentSnapshot.data()?.address || '');
        setPhotoURL(
          documentSnapshot.data()?.photoURL ||
            'https://images.unsplash.com/photo-1585238342024-78d387f4a707?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
        );
      });
    return () => subscriber();
  }, [id]);

  return (
    <View style={[LayoutStyles.layoutStretch, styles.header]}>
      <CornerButton sourceImage={Images.ICON.BURGER} handlePress={handleShowMenu} />
      {userAddress.length > 10 && (
        <View style={styles.headerAddress}>
          <Text style={TextStyles.textSmall}>
            Deliver to <Image source={Images.ICON.ARROW_DOWN} />
          </Text>
          <Text style={[TextStyles.textMain, styles.addressText]} numberOfLines={2}>
            {userAddress}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[LayoutStyles.layoutShadowRed, styles.avatar]}
        onPress={() => navigation.navigate('Profile')}
      >
        <Image source={{ uri: photoURL || auth()?.currentUser?.photoURL }} style={styles.avatar} />
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
    width: '70%',
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
