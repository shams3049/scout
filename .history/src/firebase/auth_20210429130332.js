import firebase from 'firebase/app';

export const Signup = async ({firstName, lastName, email, password}) => {
  const resp = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await resp.user.updateProfile({displayName: '${firstName} ${lastName}'});
}