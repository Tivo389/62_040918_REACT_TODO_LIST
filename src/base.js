import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBQ0Ra3esqtouShN30pcFsbGy5GjMoKTqQ",
  authDomain: "react-todo-list-9b926.firebaseapp.com",
  databaseURL: "https://react-todo-list-9b926.firebaseio.com",
  projectId: "react-todo-list-9b926",
  storageBucket: "react-todo-list-9b926.appspot.com",
  messagingSenderId: "730427638952"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;