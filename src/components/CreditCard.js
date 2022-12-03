import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import Color from '../constants/Color';
import TextStyles from '../styles/TextStyles';
import dayjs from 'dayjs';

const CreditCard = ({ name = 'HA VAN KIEN', date = '1224', number = '0000000000000000' }) => {
  const renderNumber =
    number.slice(0, 4) +
    ' ' +
    number.slice(4, 8) +
    ' ' +
    number.slice(8, 12) +
    ' ' +
    number.slice(12, 16);
  const renderDate = dayjs(`2018-${date.slice(2, 4)}-${date.slice(0, 2)}`).format('DD/MM');
  return (
    <ImageBackground
      style={styles.container}
      source={Images.IMAGES.CREDIT_CARD_BACKGROUND}
      imageStyle={{ borderRadius: 30 }}
      resizeMode='cover'
    >
      <View style={styles.heading}>
        <Image
          source={Images.IMAGES.SECURITY_CHIP}
          style={styles.masterCardIcon}
          resizeMode='cover'
        />
        <Image
          source={Images.IMAGES.MASTER_CARD}
          style={styles.masterCardIcon}
          resizeMode='cover'
        />
      </View>
      <Text style={[TextStyles.h3, styles.legit]}>{renderNumber}</Text>
      <View style={styles.bottom}>
        <View>
          <Text style={styles.bottomSubInfo}>Card Holder</Text>
          <Text style={[TextStyles.h3, styles.bottomInfo]}>{name}</Text>
        </View>
        <View>
          <Text style={styles.bottomSubInfo}>Expires</Text>
          <Text style={[TextStyles.h3, styles.bottomInfo]}>{renderDate}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 20,
    height: 200,
    backgroundColor: Color.white,
    borderRadius: 30,
    marginBottom: 20,
  },
  masterCardIcon: {
    width: 45,
    height: 45,
  },
  legit: {
    color: Color.white,
    flex: 1,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomInfo: {
    color: Color.white,
  },
  bottomSubInfo: {
    color: Color.grey,
  },
});
