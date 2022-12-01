import firestore from '@react-native-firebase/firestore';

const foodCollection = firestore().collection('food');

export const fetchAllFoodApi = async () => {
  let results = [];
  await foodCollection.get().then((collections) =>
    collections.forEach((documentSnapshot) => {
      results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
    })
  );
  return results;
};

export const addFoodApi = async (data) => {
  return await foodCollection.add(data).then((res) => res);
};
