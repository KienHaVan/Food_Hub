import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity } from 'react-native';

//region Import styling
import TextStyles from '../../styles/TextStyles';
import LayoutStyles from '../../styles/Layout';
import Colors from '../../constants/Color';
import Sizes from '../../constants/Size';
//endregion

//region Import utils
import { Categories } from '../../api/fakeData/Categories';
import { scaleSizeUI } from '../../utils/scaleSizeUI';
//endregion

const HomeCategories = () => {
  const [activeCard, setActiveCard] = useState(0);

  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setActiveCard(item.id)}
        style={[
          styles.card,
          activeCard === item.id ? LayoutStyles.layoutShadowRed : LayoutStyles.layoutShadowGrey,
          activeCard === item.id ? styles.cardActive : null,
        ]}
      >
        <Image source={item.image} style={styles.cardImage} />
        <Text style={[TextStyles.textSmall, activeCard === item.id && TextStyles.textWhite]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        style={styles.cardList}
        contentContainerStyle={{ alignItems: 'center' }}
        data={Categories}
        keyExtractor={(cat) => cat.id}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <TouchableOpacity>
            <Text style={[TextStyles.textMain, styles.listLink]}>View All</Text>
          </TouchableOpacity>
        }
        ListHeaderComponentStyle={{
          width: '8%',
          marginHorizontal: Sizes.sizeBig,
        }}
      />
    </View>
  );
};

export default HomeCategories;

const styles = StyleSheet.create({
  cardList: {
    marginHorizontal: -Sizes.sizeBig,
  },
  listLink: {
    textAlign: 'center',
    color: Colors.primary,
  },
  card: {
    minWidth: scaleSizeUI(70),
    backgroundColor: Colors.white,
    borderRadius: 100,
    marginTop: Sizes.sizeLargeH,
    marginBottom: Sizes.sizeMassiveH,
    marginRight: Sizes.sizeModerate,
    alignItems: 'center',
    paddingTop: Sizes.sizeTinyH,
    paddingHorizontal: Sizes.sizeTiny,
    paddingBottom: Sizes.sizeModerateH,
  },
  cardActive: {
    backgroundColor: Colors.primary,
  },
  cardImage: {
    width: scaleSizeUI(60),
    height: scaleSizeUI(60),
    marginBottom: Sizes.sizeSmallerH,
  },
});
