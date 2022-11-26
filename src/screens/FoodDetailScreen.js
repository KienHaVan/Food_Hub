import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

//region Import styling
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
//endregion

import { Images } from '../../assets';

const FoodDetailScreen = ({ data }) => {
  return (
    <View style={LayoutStyles.layoutScreen}>
      <Image source={data.image} />
      <Text style={TextStyles.h2}>{data.name}</Text>
      <View style={styles.rating}>
        <Image source={Images.ICON.STAR_LARGE} />
        <Text style={TextStyles.textMain}>{data.ratings}</Text>
        <Text style={TextStyles.textMain}>({data.ratingCount})</Text>
        <TouchableOpacity>
          <Text style={TextStyles.textMain}>See Reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodDetailScreen;

const styles = StyleSheet.create({});
