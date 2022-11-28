import { StyleSheet } from 'react-native';

import Colors from '../constants/Color';
import Sizes from '../constants/Size';

module.exports = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins-Bold',
    //fontSize 48
    fontSize: Sizes.textSizeLarge,
    color: Colors.secondary,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    //fontSize 25
    fontSize: Sizes.textSizeBig,
    color: Colors.secondary,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    //fontSize 16
    fontSize: Sizes.textSizeModerate,
    color: Colors.secondaryDarker,
  },
  textMain: {
    fontFamily: 'Poppins-Regular',
    //fontSize 14
    fontSize: Sizes.textSizeSmall,
    color: Colors.grey,
  },
  textSmall: {
    fontFamily: 'Poppins-Regular',
    //fontSize 12
    fontSize: Sizes.textSizeTiny,
    color: Colors.grey,
  },
  textWhite: {
    color: Colors.white,
  },
});
