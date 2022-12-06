import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import CustomButton from '../../components/CustomButton';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTheme } from '../../features/categorySlice';

const SearchThemes = [
  {
    id: 0,
    theme: 'Food',
  },
  {
    id: 1,
    theme: 'Restaurants',
  },
];

const FilterPopup = ({ data, hidePopup, onSelect, onConfirmed, currentCriteria }) => {
  const dispatch = useDispatch();
  const searchTheme = useSelector((state) => state.category.searchTheme);

  useEffect(() => {
    if (currentCriteria === 3 && searchTheme === 1) onSelect(currentCriteria - 2);
  }, [searchTheme]);

  const handleSorting = () => {
    hidePopup();
    onConfirmed();
  };

  return (
    <View style={styles.popup}>
      <Text style={TextStyles.h3}>Select one</Text>
      <View style={styles.dataList}>
        {SearchThemes.map((item) => {
          return (
            <TouchableOpacity
              key={item.id}
              style={[LayoutStyles.layoutStretch, styles.dataItem]}
              onPress={() => dispatch(setSearchTheme(item.id))}
            >
              <Text style={[TextStyles.textMain, styles.dataItemText]}>{item.theme}</Text>
              <View style={[styles.radioWrapper, LayoutStyles.layoutCenter]}>
                {searchTheme === item.id ? <View style={styles.radio} /> : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={TextStyles.h3}>Sort by</Text>
      <View style={styles.dataList}>
        {data.map((item) => {
          return (
            <TouchableOpacity
              disabled={item.id === 3 && searchTheme === 1}
              key={item.id}
              style={[
                LayoutStyles.layoutStretch,
                styles.dataItem,
                item.id === 3 && searchTheme === 1 && styles.dataItemInactive,
              ]}
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
    width: '80%',
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
  dataItemInactive: {
    opacity: 0.2,
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
