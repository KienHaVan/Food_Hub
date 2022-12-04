import React, { useEffect } from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  Image,
} from 'react-native';

import LayoutStyles from '../../styles/Layout';
import TextStyles from '../../styles/TextStyles';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCategories, toggleModal } from '../../features/categorySlice';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { Images } from '../../../assets';
import Loader from '../../components/Loader';

const HomeCategoriesModal = ({ isModalShown }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const categories = useSelector((state) => state.category.categories);
  const categoriesLoading = useSelector((state) => state.category.isLoading);

  useEffect(() => {
    if (isModalShown) {
      dispatch(fetchCategories());
    }
  }, [isModalShown]);

  const handlePress = (item) => {
    dispatch(toggleModal());
    navigation.navigate('Search', { category: item });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.categoryItem} onPress={() => handlePress(item)}>
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={TextStyles.textMain}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal visible={isModalShown} transparent={true} animationType='slide'>
      <TouchableOpacity
        style={styles.modalBackground}
        activeOpacity={1}
        onPressOut={() => dispatch(toggleModal())}
      >
        <TouchableWithoutFeedback>
          <View style={[LayoutStyles.layoutShadowGrey, styles.modal]}>
            <Loader loaderVisible={categoriesLoading} />

            <Image source={Images.ICON.CLOSE} style={styles.modalCloseButton} />

            <Text style={[TextStyles.h2, styles.modalHeading]}>All Categories</Text>

            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default HomeCategoriesModal;

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
  },
  modal: {
    width: '100%',
    height: '85%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    borderTopLeftRadius: Sizes.sizeLarge,
    borderTopRightRadius: Sizes.sizeLarge,
    paddingTop: Sizes.sizeLargeH,
    paddingHorizontal: Sizes.sizeBig,
  },
  modalCloseButton: {
    position: 'absolute',
    top: Sizes.sizeLargeH,
    right: Sizes.sizeLarge,
  },
  modalHeading: {
    marginBottom: Sizes.sizeMassiveH,
  },
  categoryItem: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: Sizes.sizeLargeH + Sizes.sizeModerateH,
  },
  categoryImage: {
    width: scaleSizeUI(60),
    height: scaleSizeUI(60),
    borderRadius: 100,
    marginBottom: Sizes.sizeModerateH,
  },
});
