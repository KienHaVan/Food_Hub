import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

//region Import styling
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
//endregion

//region Import components
import HomeHeader from '../modules/Home/HomeHeader';
import HomeSearch from '../modules/Home/HomeSearch';
import HomeCategories from '../modules/Home/HomeCategories';
import HomeFeatured from '../modules/Home/HomeFeatured';
import HomePopularList from '../modules/Home/HomePopularList';
//endregion

const LoginScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[LayoutStyles.layoutScreen, styles.screen]}>
        <HomeHeader />

        <Text style={[TextStyles.h2, styles.screenHeading]}>What would you like to order</Text>

        <HomeSearch />

        <HomeCategories />

        <HomeFeatured />

        <HomePopularList />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    paddingVertical: Sizes.sizeLargeH,
    paddingHorizontal: Sizes.sizeBig,
  },
  screenHeading: {
    width: '80%',
    marginBottom: Sizes.sizeBig,
  },
});
