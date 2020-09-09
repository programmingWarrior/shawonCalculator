import React from 'react';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [user,setUser] = useState({
    isSignedIn :false,
    name : '',
    email:'',
    photo:''
  });
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email,photoURL} = res.user;
      const isSignedInUser = {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL,

      }
      setUser(isSignedInUser);
      console.log(displayName,email,photoURL);
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res=>{
      const signedOutUser = ({
        isSignedIn:false,
        name:'',
        phone:'',
        email:'',

      })
      setUser(signedOutUser);
      console.log(res);
    })
    .catch(err =>{
      console.log(err);
    })
  }

  return (
   <div>
     
    {
      user.isSignedIn ? <button onClick={handleSignOut} className="btn btn-primary">Sign out</button>
      :
     <button onClick={handleSignIn} className="btn btn-primary">Sign in</button>
    }
     {
       user.isSignedIn &&<div> <h1>Welcome <img style={{borderRadius:'50%', width:'100px', height:'100px'}} src={user.photo} alt=""/> {user.name} To this Finance Project.</h1> 
       <p>Your Email:{user.email}</p>
       
       

       </div>
     }
     
    </div>
  );
}

export default App;
