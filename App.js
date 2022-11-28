import { StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//Import screens
import { HomeScreen } from './src/screens';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <MainStackNavigator />
        <Toast />
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
