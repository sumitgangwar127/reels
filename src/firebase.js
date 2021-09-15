import firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"
import config from "./config.json"
import "firebase/storage"


firebase.initializeApp(config)

//flag => using google
let provider = new firebase.auth.GoogleAuthProvider()

//object jiske andar login/logout/signin functionality hai
export const auth = firebase.auth();

//object jiske andar firestore ki functionalities hai
export const firestore = firebase.firestore();

export const storage = firebase.storage();

// ke mujhe provider ko use krke signin krna hai
export const signInWithGoogle = ()=>{
    auth.signInWithPopup(provider);
}

export default firebase;