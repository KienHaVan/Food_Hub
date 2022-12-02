import firestore from '@react-native-firebase/firestore';

const categoriesCollection = firestore().collection('category');

export const fetchCategoriesApi = async (areFeatured) => {
  const results = [];
  const categories = areFeatured
    ? await categoriesCollection.limit(6).get()
    : await categoriesCollection.get();
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
