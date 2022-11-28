import { StyleSheet, SafeAreaView, View } from 'react-native';
import React from 'react';

//Import screens
import { HomeScreen, LoginScreen } from './src/screens';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <LoginScreen />
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
