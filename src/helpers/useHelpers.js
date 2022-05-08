import React, { useState } from "react";

// Firebase
import { getAuth } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

/* -----Helpers-----
  Helpers some are being used some aren't---notes
  and potential uses at the bottom. Going to dive in to 
  Errors then export the helpers into a context provider.
 */ 

export default function useHelpers({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // set user to current state
    async function setCurrentUser() {
      const auth = { getAuth };
      const user = auth.currentUser;
      if (user) {
        console.log('User email: ', user.email);
        console.log(user.id);
        console.log(user.idToken);
        console.log(user.createdAt);
        console.log(user.apiKey);
      }
    };

    // login with email and pass -- generates a new token on refresh
    async function login() {
        await signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
            console.log(res)
            setUser(true);
        })
        .catch((e) => {
            console.log(e);
        })
    };

    // registers new user  ---- emial isnt verified
    async function  register() {
        await createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        })
    };

    // signnOut works but sketchy loloololol
    async function signout() {
        await signOut()
        .then((res) => {
        })
        .catch((e) => {
          console.error(e)
        })
    };

    // Using a redirect.
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you the OAuth Access Token for that provider.
        var token = result.credential.accessToken;
      }
      var user = result.user;
    });

    // Bassic OAuth
    // Start a sign in process for an unauthenticated user.
    var provider = new firebase.auth.OAuthProvider('google.com');
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithRedirect(provider);

    // Using a popup.
    var provider = new firebase.auth.OAuthProvider('google.com');
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().signInWithPopup(provider).then(function(result) {
     // This gives you the OAuth Access Token for that provider.
     var token = result.credential.accessToken;
     // The signed-in user info.
     var user = result.user;
    });


          return (
            user,
            setCurrentUser,
            login,
            register,
            signout
          );
};

// Android firebase bugs links phone auth-----------------------------------------
  // The debug signing certificate is optional to use Firebase with your app, but is 
  // required for Dynamic Links, Invites and Phone Authentication. To generate a certificate 
  // run cd android && ./gradlew signingReport. This generates two variant keys. You have to 
  // copy both 'SHA1' and 'SHA-256' keys that belong to the 'debugAndroidTest' variant key option. 
  // Then, you can add those keys to the 'SHA certificate fingerprints' 
  // on your app in Firebase console.

// verifiy property--------------------------------
//   verificationId
// verificationId: string
// The phone number authentication operation's verification ID. 
// This can be used along with the verification code to initialize a 
// phone auth credential.


  // verify method--------------------------------------
  // confirm ( verificationCode :  string ) : Promise < UserCredential >
  // Finishes a phone number sign-in, link, or reauthentication, given 
  // the code that was sent to the user's mobile device.
  // Error Codes
  // auth/invalid-verification-code
  // Thrown if the verification code is not valid.
  // auth/missing-verification-code
  // Thrown if the verification code is missing.
  // Parameters
  // verificationCode: string
  // Returns Promise<UserCredential>


  // multi factor error-----------------------------------------
  // firebase.auth().signInWithEmailAndPassword()
  //   .then(function(result) {
  //     // User signed in. No 2nd factor challenge is needed.
  //   })
  //   .catch(function(error) {
  //     if (error.code == 'auth/multi-factor-auth-required') {
  //       var resolver = error.resolver;
  //       var multiFactorHints = resolver.hints;
  //     } else {
  //       // Handle other errors.
  //     }
  //   });

  // resolver.resolveSignIn(multiFactorAssertion)
  //   .then(function(userCredential) {
  //     // User signed in.
  //   });



// multifactor resolver---------------------------------------
//   .then(function(result) {
//     // User signed in. No 2nd factor challenge is needed.
//   })
//   .catch(function(error) {
//     if (error.code == 'auth/multi-factor-auth-required') {
//       var resolver = error.resolver;
//       // Show UI to let user select second factor.
//       var multiFactorHints = resolver.hints;
//     } else {
//       // Handle other errors.
//     }
//   });

// // The enrolled second factors that can be used to complete
// // sign-in are returned in the `MultiFactorResolver.hints` list.
// // UI needs to be presented to allow the user to select a second factor
// // from that list.

// var selectedHint = // ; selected from multiFactorHints
// var phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
// var phoneInfoOptions = {
// multiFactorHint: selectedHint,
// session: resolver.session
// };
// phoneAuthProvider.verifyPhoneNumber(
// phoneInfoOptions,
// appVerifier
// ).then(function(verificationId) {
// // store verificationID and show UI to let user enter verification code.
// });

// // UI to enter verification code and continue.
// // Continue button click handler
// var phoneAuthCredential =
//   firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
// var multiFactorAssertion =
//   firebase.auth.PhoneMultiFactorGenerator.assertion(phoneAuthCredential);
// resolver.resolveSignIn(multiFactorAssertion)
//   .then(function(userCredential) {
//     // User signed in.
//   });
