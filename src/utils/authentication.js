import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const SignInAnonymously = () => {
  auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch((error) => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
};
export const SignUpWithEmailAndPassword = async (email, password) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};
export const SignInWithEmailAndPassword = async (email, password) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account signed in!');
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
};

export const SignOut = async () => {
  await auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

// export function resetPassword(email) {
//   return sendPasswordResetEmail(auth, email).then((a) => {
//     alert('Password reset email sent');
//   });
// }

export function passwordReset(email) {
  return auth().sendPasswordResetEmail(email);
}

export const addUserToFirebase = async (props) => {
  const usersCollection = firestore().collection('users');
  await usersCollection.add({ ...props });
};
export const addUserToFirebaseWithID = async (props, id) => {
  const usersCollection = firestore().collection('users').doc(id);
  await usersCollection.set({ ...props });
};
