import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';

const LogWithFacebookAndGoogle = ({ text, dark = false }) => {
  return (
    <View>
      <View style={styles.bottomHeading}>
        <View style={[styles.bottomHeadingLeft, dark ? styles.bottomBackgroundDark : null]}></View>
        <Text
          style={[
            TextStyles.textMain,
            TextStyles.textWhite,
            styles.bottomHeadingCenter,
            dark ? styles.bottomColorDark : null,
          ]}
        >
          {text}
        </Text>
        <View style={[styles.bottomHeadingRight, dark ? styles.bottomBackgroundDark : null]}></View>
      </View>

      <View style={styles.bottomMeta}>
        <TouchableOpacity style={styles.bottomMetaButton}>
          <Image source={Images.IMAGES.FACEBOOK} style={styles.bottomMetaImage}></Image>
          <Text style={[TextStyles.textMain, styles.metaButtonText]}>FACEBOOK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMetaButton}>
          <Image source={Images.IMAGES.GOOGLE} style={styles.bottomMetaImage}></Image>
          <Text style={[TextStyles.textMain, styles.metaButtonText]}>GOOGLE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogWithFacebookAndGoogle;

const styles = StyleSheet.create({
  bottomHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  bottomBackgroundDark: {
    backgroundColor: '#5b5b5b',
  },
  bottomColorDark: {
    color: '#5b5b5b',
  },
  bottomHeadingLeft: {
    height: 1,
    backgroundColor: 'white',
    flex: 1,
    marginLeft: 10,
  },
  bottomHeadingCenter: {
    marginHorizontal: 18,
  },
  bottomHeadingRight: {
    height: 1,
    flex: 1,
    backgroundColor: 'white',
    marginRight: 10,
  },
  bottomMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  bottomMetaButton: {
    padding: 13,
    backgroundColor: 'white',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 139,
  },
  bottomMetaImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  metaButtonText: {
    color: '#000',
  },
});
