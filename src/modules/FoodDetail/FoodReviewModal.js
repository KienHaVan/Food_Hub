import React from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import { toggleModal } from '../../features/categorySlice';
import LayoutStyles from '../../styles/Layout';
import { Images } from '../../../assets';
import TextStyles from '../../styles/TextStyles';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
import { useDispatch } from 'react-redux';

const FoodReviewModal = ({ isModalShown, hideReview, data }) => {
  const dispatch = useDispatch();

  const renderItem = ({ item }) => {
    return (
      <View style={styles.reviewItem}>
        <View style={styles.reviewUser}>
          <View>
            <Image source={{ uri: item.userAvatar }} style={styles.reviewUserAvatar} />
            <View>{}</View>
          </View>
          <View>
            <Text style={[TextStyles.textMain, styles.reviewUserName]}>{item.userName}</Text>
            <Text>{item.date}</Text>
          </View>
        </View>

        <Text style={TextStyles.textMain}>{item.userReview}</Text>
      </View>
    );
  };

  return (
    <Modal visible={isModalShown} transparent={true} animationType='slide'>
      <TouchableOpacity style={styles.modalBackground} activeOpacity={1} onPressOut={hideReview}>
        <TouchableOpacity
          style={[LayoutStyles.layoutShadowRed, styles.modalCloseButton]}
          onPress={hideReview}
        >
          <Image source={Images.ICON.CLOSE} />
        </TouchableOpacity>
        <TouchableWithoutFeedback>
          <View style={[LayoutStyles.layoutShadowGrey, styles.modal]}>
            <Text style={[TextStyles.h2, styles.modalHeading]}>All Reviews</Text>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item) => item.userName}
              renderItem={renderItem}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default FoodReviewModal;

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
    zIndex: 4,
    top: Sizes.sizeMassiveH * 3,
    right: Sizes.sizeLarge,
    backgroundColor: Colors.white,
    borderRadius: 100,
    padding: Sizes.sizeSmall,
  },
  modalHeading: {
    marginBottom: Sizes.sizeMassiveH,
  },
  reviewItem: {
    marginBottom: Sizes.sizeLargeH,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.sizeModerateH,
  },
  reviewUserAvatar: {
    width: Sizes.sizeMassive,
    height: Sizes.sizeMassive,
    borderRadius: 100,
    marginRight: Sizes.sizeModerate,
  },
  reviewUserName: {
    color: Colors.secondaryDarker,
  },
});
