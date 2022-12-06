import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Images } from '../../assets';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import LayoutStyles from '../styles/Layout';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const InputField = ({
  placeholder,
  label,
  preIcon,
  isPassword,
  keyboardType,
  isShowKeyboard,
  returnKeyType = 'done',
  isDisabled,
  isEditable,
  isSelected,
  defaultValue = '',
  value,
  onChangeText,
  onSubmitted,
  ...props
}) => {
  const [isPasswordShown, setIsPasswordShown] = useState(isPassword);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.inputField}>
      {label ? <Text style={[TextStyles.textMain, styles.label]}>{label}</Text> : null}

      <View
        style={[
          LayoutStyles.layoutStretch,
          LayoutStyles.layoutShadowGrey,
          isDisabled ? styles.disabled : styles.inputContainer,
          preIcon !== undefined ? styles.inputWithIcon : null,
          isFocus ? styles.inputFocus : styles.inputOnBlur,
        ]}
      >
        <View
          style={[
            LayoutStyles.layoutStretch,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              width: isPassword ? '90%' : '100%',
            },
          ]}
        >
          {preIcon && <Image source={preIcon} style={styles.iconSearch} />}
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPasswordShown}
            cursorColor={Colors.grey}
            defaultValue={defaultValue}
            value={value}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            showSoftInputOnFocus={isShowKeyboard}
            editable={isEditable}
            selectTextOnFocus={isSelected}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onSubmitEditing={onSubmitted}
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
  disabled: {
    backgroundColor: Colors.grey,
    borderWidth: 2,
    borderRadius: Sizes.sizeSmall,
    opacity: 0.3,
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
  iconSearch: {
    width: 24,
    height: 24,
  },
});

export default InputField;
