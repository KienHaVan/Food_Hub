import firestore from '@react-native-firebase/firestore';

const foodCollection = firestore().collection('food');

export const fetchFoodApi = async (category, searchTerm, sortCriteria) => {
  let results = [];
  //If category is passed into the function => search by both category and searchTerm
  if (category) {
    await foodCollection
      .where('categories', 'array-contains', category)
      .orderBy(sortCriteria, 'desc')
      .get()
      .then((collections) =>
        collections.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().name.includes(searchTerm) ||
            documentSnapshot.data().description.includes(searchTerm)
          ) {
            results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
          }
        })
      );
    return results;
  }
  //If category is not passed into the function => search by searchTerm only
  if (!category) {
    await foodCollection
      .orderBy(sortCriteria, 'desc')
      .get()
      .then((collections) =>
        collections.forEach((documentSnapshot) => {
          if (
            documentSnapshot.data().name.includes(searchTerm) ||
            documentSnapshot.data().description.includes(searchTerm)
          ) {
            results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
          }
        })
      );
    return results;
  }
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
