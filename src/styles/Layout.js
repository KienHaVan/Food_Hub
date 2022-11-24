import { StyleSheet } from 'react-native';

import Colors from '../constants/Color';
import Sizes from '../constants/Size';

module.exports = StyleSheet.create({
  //Use this if you want to center elements inside horizontally
  layoutCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Use this if you want to make elements inside spaced evenly horizontally
  layoutStretch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  //Use this to set shadow to element (grey color)
  layoutShadowGrey: {
    shadowColor: Colors.grey,
    shadowOpacity: 0,
    shadowRadius: 50,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: Sizes.sizeLarge,
  },
  //Use this to set shadow to element (red toned color)
  layoutShadowRed: {
    shadowColor: Colors.primary,
    shadowOpacity: 0,
    shadowRadius: 50,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: Sizes.sizeLarge,
  },
  //screen global styles - every screens will have a height of 100% and a white background
  layoutScreen: {
    height: '100%',
    backgroundColor: Colors.white,
  },
});
