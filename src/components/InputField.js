import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const InputField = ({ placeholder, label, preIcon, isPassword, ...props }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(isPassword);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.inputField}>
      {label ? <Text style={[TextStyles.textMain, styles.label]}>{label}</Text> : null}

      <View
        style={[
          LayoutStyles.layoutStretch,
          LayoutStyles.layoutShadowGrey,
          styles.inputContainer,
          preIcon !== undefined ? styles.inputWithIcon : null,
          isFocus ? styles.inputFocus : styles.inputOnBlur,
        ]}
      >
        <View
          style={[
            LayoutStyles.layoutStretch,
            {
              width: isPassword ? '90%' : '100%',
            },
          ]}
        >
          {preIcon && <Image source={preIcon} />}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPasswordShown}
            cursorColor={Colors.grey}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            {...props}
          />
        </View>
        {isPassword ? (
          <TouchableOpacity onPress={() => setIsPasswordShown(!isPasswordShown)}>
            <Image source={Images.ICON.EYE} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: Sizes.sizeSmallH,
  },
  inputField: {
    width: '100%',
  },
  inputContainer: {
    height: scaleSizeUI(51),
    borderWidth: 2,
    borderRadius: Sizes.sizeSmall,
    backgroundColor: Colors.white,
  },
  inputFocus: {
    borderColor: Colors.primary,
  },
  inputOnBlur: {
    borderColor: Colors.greyLighter,
  },
  inputWithIcon: {
    paddingHorizontal: Sizes.sizeModerate,
  },
  input: {
    flex: 1,
    marginLeft: Sizes.sizeSmall,
    color: Colors.secondaryDarker,
    fontFamily: 'Poppins-Regular',
  },
});

export default InputField;
