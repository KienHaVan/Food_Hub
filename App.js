import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';

//Import screens
import { HomeScreen } from './src/screens';

const App = () => {
  return (
    <SafeAreaView>
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
