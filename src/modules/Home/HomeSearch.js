import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Images } from '../../../assets';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import LayoutStyles from '../../styles/Layout';
import InputField from '../../components/InputField';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useNavigation } from '@react-navigation/native';
import FilterPopup from '../Search/FilterPopup';
import Popup from '../../components/Popup';
import { SearchCriterias } from '../../data/SearchCriterias';

const HomeSearch = () => {
  const navigation = useNavigation();
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [currentCriteria, setCurrentCriteria] = useState(0);

  const handleSearch = (searchTerm) => {
    navigation.navigate('Search', { searchTerm });
  };

  return (
    <View style={styles.homeSearch}>
      <Popup isVisible={isPopupShown} hidePopup={() => setIsPopupShown(false)}>
        <FilterPopup
          data={SearchCriterias}
          currentCriteria={currentCriteria}
          onSelect={setCurrentCriteria}
          onConfirmed={() =>
            navigation.navigate('Search', {
              defaultSortCriteria: SearchCriterias[currentCriteria - 1].criteria,
            })
          }
          hidePopup={() => setIsPopupShown(false)}
        />
      </Popup>
      <View style={styles.inputContainer}>
        <InputField
          placeholder='Find for food or restaurant...'
          isPassword={false}
          preIcon={Images.ICON.SEARCH}
          onSubmitted={(event) => handleSearch(event.nativeEvent.text)}
        />
      </View>
      <TouchableOpacity
        onPress={() => setIsPopupShown(true)}
        style={[LayoutStyles.layoutShadowGrey, LayoutStyles.layoutCenter, styles.buttonFilter]}
      >
        <Image source={Images.ICON.FILTER} style={styles.buttonFilterIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeSearch;

const styles = StyleSheet.create({
  homeSearch: {
    flex: 1,
    flexDirection: 'row',
  },
  inputContainer: {
    width: '80%',
  },
  buttonFilter: {
    width: scaleSizeUI(51),
    height: scaleSizeUI(51),
    marginLeft: Sizes.sizeModerate,
    backgroundColor: Colors.white,
    borderRadius: Sizes.sizeModerate,
  },
  buttonFilterIcon: {
    width: Sizes.sizeBig,
    height: Sizes.sizeBig,
  },
});
