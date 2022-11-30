import React, { useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text } from 'react-native';
import Sizes from '../constants/Size';
import HomeCategories from '../modules/Home/HomeCategories';
import HomeFeatured from '../modules/Home/HomeFeatured';
import HomeHeader from '../modules/Home/HomeHeader';
import HomePopularList from '../modules/Home/HomePopularList';
import HomeSearch from '../modules/Home/HomeSearch';
import Menu from '../modules/Menu/Menu';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const HomeScreen = () => {
  const [showMenu, setShowMenu] = useState(false);
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  const scaleScreen = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const moveScreen = () => {
    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : scaleSizeUI(250),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const animateShowMenu = () => {
    scaleScreen();
    moveScreen();
    setShowMenu(!showMenu);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={!showMenu}>
      <Menu />

      <Animated.View
        style={[
          LayoutStyles.layoutShadowGrey,
          LayoutStyles.layoutScreen,
          styles.screen,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            borderRadius: showMenu ? Sizes.sizeModerate : 0,
            transform: [
              { scale: scaleValue },
              { translateX: offsetValue },
              { translateY: showMenu ? -scaleSizeUI(150) : 0 },
            ],
          },
        ]}
      >
        <HomeHeader handleShowMenu={animateShowMenu} />
        <Text style={[TextStyles.h2, styles.screenHeading]}>What would you like to order</Text>
        <HomeSearch />
        <HomeCategories />
        <HomeFeatured />
        <HomePopularList />
      </Animated.View>
    </ScrollView>
  );
};

export default HomeScreen;

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
