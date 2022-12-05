import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TextStyles from '../styles/TextStyles';
import { scaleSizeUI } from '../utils/scaleSizeUI';
import Color from '../constants/Color';
import { useState } from 'react';
import BillingItemCard from '../components/BillingItemCard';

const statusList = [
  {
    id: 0,
    text: 'Active',
  },
  {
    id: 1,
    text: 'Completed',
  },
  {
    id: 2,
    text: 'Cancelled',
  },
];

const OrderScreen = () => {
  const [checked, setChecked] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={[TextStyles.h3, styles.heading]}>Orders</Text>
      <View style={styles.tag}>
        {statusList.map((item) => (
          <TouchableOpacity
            style={[styles.tagButton, checked === item.id ? styles.tagButtonActive : null]}
            key={item.id}
            onPress={() => setChecked(item.id)}
          >
            <Text
              style={[
                TextStyles.textMain,
                styles.tagText,
                checked === item.id ? styles.tagTextActive : null,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 30 }}>
        <BillingItemCard />
      </View>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: Color.white,
  },
  heading: {
    marginBottom: 20,
    marginHorizontal: scaleSizeUI(24),
    alignSelf: 'center',
  },
  tag: {
    marginHorizontal: scaleSizeUI(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tagButton: {
    borderBottomWidth: 2,
    flex: 1 / 3,
    borderBottomColor: Color.greyLighter,
  },
  tagButtonActive: {
    borderBottomWidth: 4,
    borderBottomColor: Color.primary,
  },
  tagText: {
    alignSelf: 'center',
  },
  tagTextActive: {
    alignSelf: 'center',
    color: Color.primary,
  },
});
