import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Images } from '../../assets';
import CartCard from '../components/CartCard';
import CornerButton from '../components/CornerButton';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';

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
        <View
          style={{
            width: Sizes.sizeLarge + Sizes.sizeSmaller,
            height: Sizes.sizeLarge + Sizes.sizeSmaller,
          }}
        />
      </View>

      <FlatList
        data={carts}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={{ height: Sizes.sizeMassive }}
      />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeBigH,
  },
  header: {
    marginBottom: Sizes.sizeBigH,
    marginHorizontal: Sizes.sizeBig,
  },
});
