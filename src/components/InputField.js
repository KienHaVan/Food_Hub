import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Colors from '../constants/Color';
import Sizes from '../constants/Size';
import TextStyles from '../styles/TextStyles';
import LayoutStyles from '../styles/Layout';

const InputField = ({ placeholder, label, preIcon, isPassword }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(isPassword);

  return (
    <View>
      {label ? <Text style={[TextStyles.textMain, styles.label]}>{label}</Text> : null}

      <View style={[LayoutStyles.layoutStretch, styles.inputContainer]}>
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
            <Image source={require('../../assets/icons/icon_eye.png')} />
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
  inputContainer: {
    borderWidth: 2,
    borderColor: Colors.greyLighter,
    borderRadius: Sizes.sizeSmall,
    paddingHorizontal: Sizes.sizeModerate,
    paddingVertical: Sizes.sizeSmallH,
    color: Colors.primary,
    fontFamily: 'Poppins-Regular',
  },
  input: {
    flex: 1,
    marginLeft: Sizes.sizeSmall,
  },
});

export default InputField;
