import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CornerButton from '../components/CornerButton';
import { Images } from '../../assets';
import TextStyles from '../styles/TextStyles';
import Color from '../constants/Color';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import CreditCard from '../components/CreditCard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ManageCreditCard = () => {
  const navigation = useNavigation();
  const [creditCardList, setCreditCardList] = useState([]);
  useEffect(() => {
    if (!auth().currentUser.email) {
      navigation.navigate('Welcome');
      return;
    }
    const id = auth()?.currentUser?.uid;
    const subscriber = firestore()
      .collection('users')
      .doc(id)
      .onSnapshot((documentSnapshot) => {
        setCreditCardList(documentSnapshot.data().payment || []);
      });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CornerButton
          sourceImage={Images.ICON.ARROW_LEFT}
          handlePress={() => navigation.navigate('HomeStack')}
        />
        <Text style={TextStyles.h3}>CREDIT CARDS</Text>
        <View style={styles.hidden}>
          <CornerButton />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {creditCardList.map((item, index) => (
          <CreditCard
            key={'#' + index.toString()}
            name={item.name}
            date={item.date}
            number={item.number}
          />
        ))}
      </ScrollView>
      <View style={styles.bottomButton}>
        <CustomButton text='ADD MORE' onPress={() => navigation.navigate('AddCreditCard')} />
      </View>
    </View>
  );
};

export default ManageCreditCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Color.white,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  hidden: {
    opacity: 0,
  },
  bottomButton: {
    height: 60,
    marginTop: 'auto',
  },
});
