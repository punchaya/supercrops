import firebase from "firebase";
const config = {
  apiKey: "AIzaSyDpDqafnL07UHzjm-YQ_pD_xUqcqou13Lc",
  authDomain: "project-58393.firebaseapp.com",
  projectId: "project-58393",
  storageBucket: "project-58393.appspot.com",
  messagingSenderId: "884745051025",
  appId: "1:884745051025:web:052328cb972d1808ebd830",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

export default firebase;
