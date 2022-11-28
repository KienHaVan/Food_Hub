import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const KeyBoardAvoidingWaraper = ({ children }) => {
  return (
    <KeyboardAvoidingView style={styles.keyboardContainer}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyBoardAvoidingWaraper;

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
});
