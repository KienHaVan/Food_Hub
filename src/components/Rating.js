import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import Colors from '../constants/Color';

const maxRating = [1, 2, 3, 4, 5];

const Rating = ({ handlePress, defaultRating }) => {
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (defaultRating === 1) {
      setLabel('Terrible');
    }
    if (defaultRating === 2) {
      setLabel('Bad');
    }
    if (defaultRating === 3) {
      setLabel('Good');
    }
    if (defaultRating === 4) {
      setLabel('Very good');
    }
    if (defaultRating === 5) {
      setLabel('Amazing');
    }
  }, [defaultRating]);

  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h2, styles.label]}>{label}</Text>
      <View style={styles.ratingContainer}>
        {maxRating.map((item) => (
          <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => handlePress(item)}>
            <Image
              source={item <= defaultRating ? Images.IMAGES.STAR_FILLED : Images.IMAGES.STAR}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.primary,
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '400',
  },
});
