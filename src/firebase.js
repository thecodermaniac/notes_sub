import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDchtOBodMbV5qaNWc4NKiBSB2acEjAOfA",
    authDomain: "assignment-prog.firebaseapp.com",
    projectId: "assignment-prog",
    storageBucket: "assignment-prog.appspot.com",
    messagingSenderId: "1020812679541",
    appId: "1:1020812679541:web:c0bc044723e28986d31b3c"
  };

  const app = initializeApp(firebaseConfig)
  const db= getFirestore(app)

  export {db}