import firestore from '@react-native-firebase/firestore';

const restaurantsCollection = firestore().collection('restaurants');

export const fetchAllRestaurantsApi = async () => {
  let results = [];
  await restaurantsCollection.get().then((collections) =>
    collections.forEach((documentSnapshot) => {
      const newItem = {
        ...documentSnapshot.data(),
        id: documentSnapshot.id,
        food: [],
        categories: [],
      };

      documentSnapshot.data().categories.forEach((cat) => {
        cat.get().then(async (res) => {
          newItem.categories = [...newItem.categories, await res.data()];
        });
      });

      results = [...results, newItem];
      console.log('from api', results);
    })
  );
  return results;
};
