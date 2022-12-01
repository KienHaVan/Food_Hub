import firestore from '@react-native-firebase/firestore';

const restaurantsCollection = firestore().collection('restaurants');

export const fetchAllRestaurantsApi = async () => {
  let results = [];
  await restaurantsCollection.get().then((collections) =>
    collections.forEach((documentSnapshot) => {
      results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
    })
  );
  return results;
};

export const addRestaurantApi = async (data) => {
  return await restaurantsCollection.add(data).then((res) => res);
};
