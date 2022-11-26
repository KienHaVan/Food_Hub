import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

//Import screens
import { HomeScreen, FoodDetailScreen } from './src/screens';

import { Food } from './src/api/fakeData/Food';

const App = () => {
  return (
    <SafeAreaView>
      {/*<HomeScreen />*/}
      <FoodDetailScreen data={Food[0]} />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
