import firebase from 'firebase'
  var firebaseConfig = {
    apiKey: "AIzaSyDjAMLh403C3quE4P2JhvO1iIZS8uW-Jvc",
    authDomain: "clone-291a0.firebaseapp.com",
    projectId: "clone-291a0",
    storageBucket: "clone-291a0.appspot.com",
    messagingSenderId: "809274020746",
    appId: "1:809274020746:web:adbae5d1629671beb8ee73",
    measurementId: "G-82LYFGB0L5"
  };
  // Initialize Firebase
  const fire=firebase.initializeApp(firebaseConfig);


  export default fire;


  const db=fire.firestore();
  const auth=fire.auth();
  const storage=fire.storage();



  export {db,auth,storage};