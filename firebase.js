
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

 const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDljGlL0XkPgwoWGYoVcWABDzfcODrIE-s",
    authDomain: "chatverse-2fe12.firebaseapp.com",
    projectId: "chatverse-2fe12",
    storageBucket: "chatverse-2fe12.appspot.com",
    messagingSenderId: "336341981552",
    appId: "1:336341981552:web:fd951cec3ac48c236dd7b5"
  });

  const db=firebaseApp.firestore();
const auth=firebase.auth();
export{db,auth}
export default firebase