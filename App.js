import { StyleSheet, SafeAreaView, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/MainStackNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId: '397847646741-rpg6qgcel1e7ed8htpjvgfdc90and1c8.apps.googleusercontent.com',
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <MainStackNavigator />
          <Toast />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
