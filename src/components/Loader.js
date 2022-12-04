import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

import Sizes from '../constants/Size';

const Loader = ({ loaderVisible = false, overlayColor = 'rgba(255,255,255,0.9)', speed = 1 }) => {
  return (
    <View>
      <AnimatedLoader
        visible={loaderVisible}
        overlayColor={overlayColor}
        source={require('../../assets/pizza-loading.json')}
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
