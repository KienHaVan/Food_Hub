import { StyleSheet, SafeAreaView, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//Import screens
import { HomeScreen } from './src/screens';
import MainStackNavigator from './src/navigation/MainStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainStackNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
