import firebase from 'firebase/app';

import 'firebase/auth';

// Initialize firebase w/ config
const firebaseConfig = {
  apiKey: "AIzaSyDRctPNHhmgT4xCtX1MsxNwvbG6bH3bD9A",
  authDomain: "worldgallery-22545.firebaseapp.com",
  projectId: "worldgallery-22545",
  storageBucket: "worldgallery-22545.appspot.com",
  messagingSenderId: "657905455305",
  appId: "1:657905455305:web:405f832012388ff749bd18",
  measurementId: "G-7S291E8H96"
};

firebase.initializeApp(firebaseConfig);