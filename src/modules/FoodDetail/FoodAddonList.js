import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TextStyles from '../../styles/TextStyles';
import Sizes from '../../constants/Size';
import Colors from '../../constants/Color';
import LayoutStyles from '../../styles/Layout';

import Counter from '../../components/Counter';
import { formatPrice } from '../../utils/formatter';

const FoodAddonItem = ({ addon }) => {
  return (
    <View style={[styles.item, LayoutStyles.layoutStretch]}>
      <View style={styles.itemContent}>
        <Text style={[TextStyles.textMain, styles.itemName]}>More {addon.name}</Text>
        <Text style={[TextStyles.textSmall, styles.itemPrice]}>+${formatPrice(addon.price)}</Text>
      </View>
      <Counter defaultValue={0} allowZero />
    </View>
  );
};

const FoodAddonList = ({ data }) => {
  if (!data) return null;

  return (
    <View style={styles.container}>
      <Text style={TextStyles.h3}>
        {data.length} Choice{data.length === 1 ? '' : 's'} of Add On
      </Text>
      {data.map((addon, index) => {
        return <FoodAddonItem key={index} addon={addon} />;
      })}
    </View>
  );
};

export default FoodAddonList;

const styles = StyleSheet.create({
  container: {
    marginTop: Sizes.sizeMassiveH,
    paddingBottom: Sizes.sizeMassiveH,
  },
  item: {
    marginTop: Sizes.sizeModerateH,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color: Colors.secondaryDarker,
    marginRight: Sizes.sizeSmaller,
  },
  itemPrice: {
    color: Colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});
