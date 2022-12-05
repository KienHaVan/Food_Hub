import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import { scaleSizeUI } from '../../utils/scaleSizeUI';

const FilterPopup = ({ data, hidePopup, onSelect, onConfirmed, currentCriteria }) => {
  const handleSorting = () => {
    hidePopup();
    onConfirmed(data[currentCriteria - 1].criteria);
  };

  return (
    <View style={styles.popup}>
      <Text style={TextStyles.h3}>Sort food by</Text>
      <View style={styles.dataList}>
        {data.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[LayoutStyles.layoutStretch, styles.dataItem]}
              onPress={() => onSelect(item.id)}
            >
              <Text style={[TextStyles.textMain, styles.dataItemText]}>{item.name}</Text>
              <View style={[styles.radioWrapper, LayoutStyles.layoutCenter]}>
                {currentCriteria === item.id ? <View style={styles.radio} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.popupButton}>
        <CustomButton text='Confirm' onPress={handleSorting} />
      </View>
    </View>
  );
};

export default FilterPopup;

const styles = StyleSheet.create({
  popup: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: Colors.white,
    paddingHorizontal: Sizes.sizeBig,
    paddingVertical: Sizes.sizeBigH,
    borderRadius: Sizes.sizeModerate,
  },
  dataList: {
    marginVertical: Sizes.sizeBigH,
  },
  dataItem: {
    marginBottom: Sizes.sizeModerateH,
  },
  dataItemText: {
    color: Colors.secondaryDarker,
  },
  radioWrapper: {
    width: Sizes.sizeBigH,
    height: Sizes.sizeBigH,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  radio: {
    borderRadius: 100,
    backgroundColor: Colors.primary,
    width: Sizes.sizeBigH - Sizes.sizeSmallH,
    height: Sizes.sizeBigH - Sizes.sizeSmallH,
  },
  popupButton: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: scaleSizeUI(50),
  },
});
