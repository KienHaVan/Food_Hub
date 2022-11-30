import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Color from '../../constants/Color';
import { useController } from 'react-hook-form';
import { Images } from '../../../assets';
import Layout from '../../styles/Layout';

const MyInput = ({ control, isPassword = false, ...props }) => {
  const [focus, setFocus] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(isPassword);
  const [togglePassword, setTogglePassword] = useState(isPassword);
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
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, focus ? styles.buttonActive : null]}
        autoCapitalize={'false'}
        onBlur={handleFocusOut}
        onFocus={() => setFocus(true)}
        onChangeText={onChange}
        value={value}
        secureTextEntry={isPasswordShown}
        {...props}
      ></TextInput>
      {isPassword && <View style={styles.seperate}></View>}
      {isPassword ? (
        <TouchableOpacity
          style={styles.iconEye}
          onPress={() => {
            setTogglePassword(!togglePassword);
            setIsPasswordShown(!isPasswordShown);
          }}
        >
          {togglePassword ? (
            <Image source={Images.ICON.EYE} />
          ) : (
            <Image style={styles.eye} source={Images.ICON.UNEYE} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  inputContainer: [
    Layout.layoutShadowGrey,
    {
      marginTop: 6,
      paddingHorizontal: 10,
      paddingVertical: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#eee',
      borderRadius: 10,
      backgroundColor: Color.white,
    },
  ],
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonActive: {
    borderColor: Color.primary,
  },
  seperate: {
    width: 10,
  },
  eye: {
    tintColor: Color.grey,
    width: 20,
    height: 20,
  },
});
