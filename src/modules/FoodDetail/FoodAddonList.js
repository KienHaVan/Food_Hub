import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import TextStyles from '../../styles/TextStyles';
import Sizes from '../../constants/Size';
import Colors from '../../constants/Color';
import LayoutStyles from '../../styles/Layout';

import Counter from '../../components/Counter';
import { formatPrice } from '../../utils/formatter';

const FoodAddonItem = ({ addon, currentAddon, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.item, LayoutStyles.layoutStretch]}
      onPress={() => onSelect(addon)}
    >
      <Text style={[TextStyles.textMain, styles.itemName]}>More {addon.name}</Text>
      <View style={styles.itemContent}>
        <Text style={[TextStyles.textSmall, styles.itemPrice]}>+${formatPrice(addon.price)}</Text>
        <View style={[styles.radioWrapper, LayoutStyles.layoutCenter]}>
          {currentAddon?.name === addon.name ? <View style={styles.radio} /> : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FoodAddonList = ({ data, currentAddon, onSelect }) => {
  if (!data) return null;

  return (
    <View style={styles.container}>
      <View style={[LayoutStyles.layoutStretch, styles.heading]}>
        <Text style={TextStyles.h3}>
          {data.length} Choice{data.length === 1 ? '' : 's'} of Add On
        </Text>
        <TouchableOpacity onPress={() => onSelect(null)}>
          <Text style={[TextStyles.textMain, styles.ratingLinkText]}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {data.map((addon, index) => {
        return (
          <FoodAddonItem
            key={index}
            currentAddon={currentAddon}
            addon={addon}
            onSelect={onSelect}
          />
        );
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
  heading: {
    marginBottom: Sizes.sizeSmallH,
  },
  ratingLinkText: {
    color: Colors.primary,
    borderBottomWidth: 1,
    borderColor: Colors.primary,
    lineHeight: Sizes.sizeModerateH + Sizes.sizeTinyH,
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
  },
  itemPrice: {
    color: Colors.primary,
    fontFamily: 'Poppins-SemiBold',
    marginRight: Sizes.sizeSmaller,
  },
  radioWrapper: {
    width: Sizes.sizeBigH,
    height: Sizes.sizeBigH,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  radio: {
    borderRadius: 100,
    backgroundColor: Colors.primary,
    width: Sizes.sizeBigH - Sizes.sizeSmallH,
    height: Sizes.sizeBigH - Sizes.sizeSmallH,
  },
});
