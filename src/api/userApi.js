import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export const fetchUserById = async (id) => {
  return await usersCollection
    .doc(id)
    .get()
    .then((res) => res.data());
};

export const updateUserApi = async (userId, newData) => {
  return await usersCollection.doc(userId).update(newData);
};
