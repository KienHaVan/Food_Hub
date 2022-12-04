import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export const updateUserApi = async (userId, newData) => {
  return await usersCollection.doc(userId).update(newData);
};
