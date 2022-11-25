import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';
import { Images } from '../../assets';
import { scaleSizeUI } from '../utils/scaleSizeUI';

const InputField = ({ placeholder, label, preIcon, isPassword }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(isPassword);

  return (
    <View style={styles.inputField}>
      {label ? <Text style={[TextStyles.textMain, styles.label]}>{label}</Text> : null}

      <View
        style={[LayoutStyles.layoutStretch, LayoutStyles.layoutShadowGrey, styles.inputContainer]}
      >
        <View
          style={[
            LayoutStyles.layoutStretch,
            {
              width: isPassword ? '90%' : '100%',
            },
          ]}
        >
          {preIcon}
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            secureTextEntry={isPasswordShown}
            cursorColor={Colors.grey}
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
    flex: 1,
  },
  inputContainer: {
    height: scaleSizeUI(51),
    borderWidth: 2,
    borderColor: Colors.greyLighter,
    borderRadius: Sizes.sizeSmall,
    paddingHorizontal: Sizes.sizeModerate,
    color: Colors.primary,
    fontFamily: 'Poppins-Regular',
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    marginLeft: Sizes.sizeSmall,
  },
});

export default InputField;
