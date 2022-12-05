import React from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const Popup = ({ children, isVisible, hidePopup }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={hidePopup}
      onSwipeComplete={hidePopup}
      backdropOpacity={0.3}
      swipeDirection={['left', 'right']}
      useNativeDriver={true}
      animationInTiming={500}
      animationIn='bounceInLeft'
      animationOutTiming={500}
      animationOut='bounceOutRight'
    >
      {children}
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({});
