import firebase from 'firebase/app';

import 'firebase/auth';

// Initialize firebase w/ config
const firebaseConfig = {
  apiKey: 'AIzaSyDRctPNHhmgT4xCtX1MsxNwvbG6bH3bD9A',
  authDomain: 'worldgallery-22545.firebaseapp.com',
  projectId: 'worldgallery-22545',
  storageBucket: 'worldgallery-22545.appspot.com',
  messagingSenderId: '657905455305',
  appId: '1:657905455305:web:405f832012388ff749bd18',
  measurementId: 'G-7S291E8H96',
};

firebase.initializeApp(firebaseConfig);

const apiRoute = 'https://us-central1-worldgallery-22545.cloudfunctions.net/api';

// Create a new user account
export const createUser = async (
  email: string,
  password: string,
  name: string,
  description: string,
  location: { lat: number; lon: number }
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

      if (!result.error) return result;
      else alert('Error: try again later.');
    })
    .catch((error) => {
      console.error(`Error ${error.code}: ${error.message}`);
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
    const response = await fetch(`${apiRoute}/search/${name}`);
    const result = await response.json();

    console.log(result);
  })
  .catch(error => {
    console.error(`Error ${error.code}: ${error.message}`);
  })
}
