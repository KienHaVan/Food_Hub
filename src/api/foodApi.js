import firestore from '@react-native-firebase/firestore';

const foodCollection = firestore().collection('food');

export const fetchFoodApi = async (category) => {
  let results = [];
  await foodCollection
    .where('categories', 'array-contains', category)
    .get()
    .then((collections) =>
      collections.forEach((documentSnapshot) => {
        results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
      })
    );
  return results;
};

export const fetchPopularFoodApi = async () => {
  let results = [];
  await foodCollection
    .where('rating', '>=', 4.5)
    .limit(10)
    .get()
    .then((collections) =>
      collections.forEach((documentSnapshot) => {
        results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
      })
    );
  return results;
};

export const addFoodApi = async (data) => {
  return await foodCollection.add(data).then((res) => res);
};
