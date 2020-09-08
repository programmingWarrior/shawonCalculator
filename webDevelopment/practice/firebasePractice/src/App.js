import React from 'react';
import './App.css';
import { Button } from 'react-bootstrap';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn = false;
    name = '',
    email:'',
    photo:''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email,photoURL} = res.user;
      console.log(displayName,email,photoURL);
    })
  }

  return (
   <div>
     
     <button onClick={handleSignIn} className="btn btn-primary">Sign in</button>
     
    </div>
  );
}

export default App;
