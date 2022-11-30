import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const TestFirestore = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const usersCollection = firestore().collection('users');
  const handleSaveFirestore = async () => {
    // getUser('K4xFsSzRu1szxY8tOoPd');
    // addUser();
    // userQuerySnapshot();
    getUsers();
  };
  const handleDeleteUser = async () => {
    deleteUser('K4xFsSzRu1szxY8tOoPd');
  };
  //get user
  const getUser = async (id) => {
    const users = await usersCollection.doc(id).get();
  };
  //get Users
  const getUsers = async () => {
    const users = await usersCollection.get();
    users.forEach((item) => console.log(item.data()));
  };
  //get Users realtime
  const getUsersRealtime = async () => {
    useEffect(() => {
      const subscriber = usersCollection.onSnapshot((documentSnapshot) => {
        console.log('User data: ', documentSnapshot.data());
      });

      // Stop listening for updates when no longer required
      return () => subscriber();
    }, [userId]);
  };
  //add user
  const addUser = async () => {
    await usersCollection.add({
      name,
      email,
    });
  };
  //delete user
  const deleteUser = async (id) => {
    await usersCollection.doc(id).delete();
  };
  const userQuerySnapshot = () => {
    usersCollection.get().then((querySnapshot) => {
      console.log('Total users: ', querySnapshot.size);
      querySnapshot.forEach((documentSnapshot) => {
        console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });
  };
  return (
    <View style={{ padding: 20 }}>
      <InputField
        label={'Name'}
        placeholder='Enter your name...'
        onChangeText={(newName) => setName(newName)}
      />
      <View style={{ height: 40 }}></View>
      <InputField
        label={'email'}
        placeholder='Enter your email...'
        onChangeText={(newEmail) => setEmail(newEmail)}
      />
      <View style={{ height: 40 }}></View>
      <View style={{ height: 60, width: 280, alignSelf: 'center' }}>
        <CustomButton text='Save to Firestore' onPress={handleSaveFirestore} />
      </View>
      <View style={{ height: 20 }}></View>
      <View style={{ height: 60, width: 280, alignSelf: 'center' }}>
        <CustomButton text='Delete' onPress={handleDeleteUser} />
      </View>
    </View>
  );
};

export default TestFirestore;

const styles = StyleSheet.create({});
