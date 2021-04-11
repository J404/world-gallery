import firebase from 'firebase/app';
import initFirebase from './firebaseconfig';

import 'firebase/auth';

// Initialize firebase w/ config
initFirebase();

export const apiRoute = 'https://us-central1-worldgallery-22545.cloudfunctions.net/api';

export interface UserData {
  name: string;
  uid: string;
  description: string;
  latitude: number;
  longitude: number;
}

// Check if a user is already signed in
export const checkSignedIn = (callback: (user: UserData) => void) => {
  firebase.auth().onAuthStateChanged(async user => {
    if (user) {
      console.log(user);
      const name = localStorage.getItem('name');
      const password = localStorage.getItem('password');
      
      if (!name || !password) {
        console.log('no credentials stored');
        return;
      }

      try {
        const response = await fetch(`${apiRoute}/search?name=${name}`);
        const result = await response.json();

        if (result.error) {
          alert('Error (9): Try again later');
          return;
        }

      callback({
        name: name as unknown as string,
        uid: user.uid,
        description: result.data[0].description,
        latitude: result.data[0].latitude,
        longitude: result.data[0].longitude,
      });
      
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('no user signed in');
      clearCredentials();
    }
  });
  }

const storeCredentials = (name: string, password: string) => {
  localStorage.setItem('name', name);
  localStorage.setItem('password', password);
}

const clearCredentials = () => {
  localStorage.setItem('name', '');
  localStorage.setItem('password', '');
}

// Create a new user account
export const createUser = async (
  email: string,
  password: string,
  name: string,
  description: string,
  location: { lat: number; lon: number },
  doneCallback: (user: UserData, error?: boolean) => void
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
      const response = await fetch(`${apiRoute}/updateUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

      if (result.error) {
        alert('Error (3): try again later.');
        return;
      }

      doneCallback({
        name,
        uid: (user as firebase.User).uid,
        description,
        latitude: location.lat,
        longitude: location.lon,
      }, false);

      storeCredentials(name, password);
    })
    .catch((error) => {
      doneCallback({} as unknown as UserData, true);
      console.error(`Error ${error.code} | (5): ${error.message}`);
    });
};

// Sign in an existing user
export const loginUser = async (
  email: string,
  password: string,
  name: string,
  doneCallback: (user: UserData, error?: boolean) => void
) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;

    console.log(user);
    
    const response = await fetch(`${apiRoute}/search?name=${name}`);
    const result = await response.json();
    console.log(result);

    if (result.error) {
      alert('Error (6): Try again later');
      return;
    }

    doneCallback({
      name,
      uid: (user as firebase.User).uid,
      description: result.data[0].description,
      latitude: result.data[0].latitude,
      longitude: result.data[0].longitude,
    }, false);

    console.log('signed in!');

    storeCredentials(name, password);
  })
  .catch(error => {
    doneCallback({} as unknown as UserData, true);
    console.error(`Error ${error.code} | (4): ${error.message}`);
  });
}

export const signOutUser = (callback: (user: UserData) => void) => {
  firebase.auth().signOut().then(() => {
    console.log('signed out!');
    clearCredentials();
    callback({} as unknown as UserData);
  })
  .catch(error => {
    alert('Error (12): Try again later');
    console.error(error);
  });
}
