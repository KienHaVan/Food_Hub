import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import CornerButton from '../components/CornerButton';
import CartCard from '../components/CartCard';
import { Images } from '../../assets';
import { useSelector } from 'react-redux';

const CartScreen = ({ navigation }) => {
  const carts = useSelector((state) => state.cart.carts);

  const renderCartItem = ({ item }) => {
    return <CartCard item={item} />;
  };

  return (
    <View style={[LayoutStyles.layoutScreen, styles.screen]}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.goBack()}
        />
        <Text style={TextStyles.h3}>Cart</Text>
        <View />
      </View>

      <FlatList data={carts} keyExtractor={(item) => item.id} renderItem={renderCartItem} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
    paddingHorizontal: Sizes.sizeBig,
  },
  header: {
    marginBottom: Sizes.sizeBigH,
  },
});
