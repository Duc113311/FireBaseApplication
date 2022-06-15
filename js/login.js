import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

// Config app
const firebaseConfig = {
  apiKey: "AIzaSyAP76I2VUVJtzUV3rLZ5awO8l7Oq2J1X2A",
  authDomain: "application-bitri.firebaseapp.com",
  projectId: "application-bitri",
  storageBucket: "application-bitri.appspot.com",
  messagingSenderId: "638359965627",
  appId: "1:638359965627:web:24de152f18a02d1c03fe9e",
  measurementId: "G-L826B5PSRQ",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);
auth.languageCode = "it";

/* Login Email*/
singUp.addEventListener("click", (e) => {
  debugger;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      window.location.assign("/login/login-success.html");
      // ...
    })
    .catch((error) => {
      window.location.assign("/login/login-error.html");
      // ..
    });
});

/*-Login Google*/

const provider = new GoogleAuthProvider();

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
  login_hint: "nguyenvanducdev@gmail.com",
});

singGoogle.addEventListener("click", (e) => {
  debugger;
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(token);
      console.log("User>>Goole>>>>", user);
      alert(user.displayName);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      console.log(errorMessage);
      console.log(provider);
      console.log(errorCode);

      //const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

// Loginv Facebook
const providerFace = new FacebookAuthProvider();
providerFace.addScope("user_birthday");
providerFace.setCustomParameters({
  display: "popup",
});

singFacebook.addEventListener("click", (e) => {
  debugger;
  signInWithRedirect(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      onsole.log(token);
      console.log(accessToken);
      console.log("User>>Goole>>>>", user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });
});

// Login PhoneNumber

window.recaptchaVerifier = new RecaptchaVerifier("recaptcha-container");

recaptchaVerifier.render().then((widfetId) => {
  window.recaptchaWidgetId = widfetId;
});


const sendVerificationCode=()=>{
    const phoneNumber=document.getElementById('phoneNumber')
    const appVerifier = window.recaptchaVerifier;
    debugger
    signInWithPhoneNumber(phoneNumber,appVerifier).then(comfirmationResult =>{
        const sentCodeId =comfirmationResult;

        signInWithPhone.addEventListener('click',()=> signInWithPhoneNumber(sentCodeId));
    })

}

const signInWithPhoneNumber = sentCodeId=>{
    const code =document.getElementById('code');

    var credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId.verificationId, code);

    signInWithPhoneNumber(credential)
    .then(function (confirmationResult) {
      // confirmationResult can resolve with the fictional testVerificationCode above.
      return confirmationResult.confirm(testVerificationCode)
    }).catch(function (error) {
      // Error; SMS not sent
      // ...
    });
}

getCode.addEventListener('click',sendVerificationCode)
