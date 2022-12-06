import firestore from '@react-native-firebase/firestore';

const foodCollection = firestore().collection('food');

export const fetchFoodApi = async (category, searchTerm, sortCriteria) => {
  let results = [];
  //If category is passed into the function => search by both category and searchTerm
  let fetchedFoodList = category
    ? await foodCollection.where('categories', 'array-contains', category)
    : await foodCollection;
  fetchedFoodList = await fetchedFoodList.orderBy(sortCriteria, 'desc');
  await fetchedFoodList
    .limit(5)
    .get()
    .then((collections) => {
      collections.forEach((documentSnapshot) => {
        if (
          documentSnapshot.data().name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          documentSnapshot.data().description.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
        }
      });
    });
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

export const fetchFoodInRestaurantApi = async (foodIdList) => {
  let results = [];
  await foodCollection.get().then((collections) =>
    collections.forEach((documentSnapshot) => {
      if (foodIdList.includes(documentSnapshot.id)) {
        results = [...results, { id: documentSnapshot.id, ...documentSnapshot.data() }];
      }
    })
  );
  return results;
};

export const addFoodApi = async (data) => {
  return await foodCollection.add(data).then((res) => res);
};
