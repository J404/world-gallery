import firebase from 'firebase/app';
import initFirebase from './firebaseconfig';

import 'firebase/auth';

// Initialize firebase w/ config
initFirebase();

const apiRoute = 'https://us-central1-worldgallery-22545.cloudfunctions.net/api';

type errRes = { error: boolean, message: string }

export interface UserData {
  name: string;
  id: string;
}

// Create a new user account
export const createUser = async (
  email: string,
  password: string,
  name: string,
  description: string,
  location: { lat: number; lon: number },
  doneCallback: (user: UserData) => void
) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      const data = {
        uid: (user as firebase.User).uid,
        name,
        description,
        latitude: location.lat,
        longitude: location.lon,
      };

      // Send additional data to server
      const response = await fetch(
        `${apiRoute}/updateUser`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log(result);

      if (result.error)
        alert('Error (3): try again later.');

      // return result;
      doneCallback({ name, id: (user as firebase.User).uid });
    })
    .catch((error) => {
      console.error(`Error ${error.code} | (5): ${error.message}`);
      // return { error, message: '' };
    });
};

// Sign in an existing user
export const loginUser = async (
  email: string,
  password: string,
  name: string
) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    console.log(user);
    
    const response = await fetch(`${apiRoute}/search/${name}`);
    const result = await response.json();

    console.log(result);
  })
  .catch(error => {
    console.error(`Error ${error.code} | (4): ${error.message}`);
  });
}
