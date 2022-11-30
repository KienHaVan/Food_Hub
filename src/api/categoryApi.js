import firestore from '@react-native-firebase/firestore';

const categoriesCollection = firestore().collection('category');

export const fetchAllCategoriesApi = async () => {
  const results = [];
  const categories = await categoriesCollection.get();
  categories.forEach((documentSnapshot) =>
    results.push({ id: documentSnapshot.id, ...documentSnapshot.data() })
  );
  return results;
};

export const fetchCategoryByIdApi = async (id) => {
  return await categoriesCollection
    .doc(id)
    .get()
    .then((res) => res.data());
};
