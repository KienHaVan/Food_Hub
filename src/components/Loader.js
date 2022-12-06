import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import Sizes from '../constants/Size';

const Loader = ({
  loaderVisible = false,
  overlayColor = 'rgba(255,255,255,0.9)',
  speed = 6,
  JsonSource = require('../../assets/pizza-loading.json'),
}) => {
  return (
    <View>
      <AnimatedLoader
        visible={loaderVisible}
        overlayColor={overlayColor}
        source={JsonSource}
        animationStyle={styles.loader}
        speed={speed}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    width: Sizes.sizeMassive * 4,
    height: Sizes.sizeMassive * 4,
  },
});
