import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Color from '../../constants/Color';
import { useController } from 'react-hook-form';

const MyInput = ({ control, ...props }) => {
  const [focus, setFocus] = useState(false);
  const {
    field: { onChange, onBlur, value },
  } = useController({
    control,
    name: props.name,
  });
  const handleFocusOut = () => {
    setFocus(false);
    onBlur();
  };
  return (
    <View>
      <TextInput
        style={[styles.input, focus ? styles.buttonActive : null]}
        onBlur={handleFocusOut}
        onFocus={() => setFocus(true)}
        onChangeText={onChange}
        value={value}
        {...props}
      ></TextInput>
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 10,
    fontSize: 16,
    marginTop: 6,
    backgroundColor: Color.white,
    elevation: 4,
  },
  buttonActive: {
    borderColor: Color.primary,
  },
});
