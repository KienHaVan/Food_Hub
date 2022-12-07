import firestore from '@react-native-firebase/firestore';

const restaurantsCollection = firestore().collection('restaurants');

export const fetchRestaurantApi = async (category, searchTerm, sortCriteria) => {
  let results = [];
  let restaurantsList = category
    ? await restaurantsCollection
        .where('categories', 'array-contains', category)
        .orderBy(sortCriteria, 'desc')
    : await restaurantsCollection.orderBy(sortCriteria, 'desc');
  await restaurantsList.get().then((collections) => {
    collections.forEach((documentSnapshot) => {
      if (documentSnapshot.data().name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
      }
    });
  });
  return results;
};

export const fetchPopularRestaurantsApi = async () => {
  let results = [];
  await restaurantsCollection
    .where('rating', '>=', 4.0)
    .limit(5)
    .get()
    .then((collections) =>
      collections.forEach((documentSnapshot) => {
        results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
      })
    );
  return results;
};

export const addRestaurantApi = async (data) => {
  return await restaurantsCollection.add(data).then((res) => res);
};
