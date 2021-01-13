import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyC7D-uUKE4UEEBo9McnESue9ajCDkTHYDY",
    authDomain: "snow-board-app-70ada.firebaseapp.com",
    projectId: "snow-board-app-70ada",
    storageBucket: "snow-board-app-70ada.appspot.com",
    messagingSenderId: "625512418494",
    appId: "1:625512418494:web:4184e9951a3e25f342a2ef"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password);

    loginUser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

    signoutUser = () => this.auth.signOut();

    passwordReset = email => this.auth.sendPasswordResetEmail(email); 

    user = uid => this.db.doc(`users/${uid}`);

    products = {
        set : (params) => this.db.collection("snows").doc().set(params),
        get : () => this.db.collection("snows").get(),
        delete : (param) => this.db.collection("snows").doc(param).delete()
    }

    commands = {
        set : (params) => this.db.collection("commands").doc().set(params),
        get : () => this.db.collection("commands").orderBy("date").get(),
        delete : (param) => this.db.collection("commands").doc(param).delete()
    }

    athletes = {
        set : (params) => this.db.collection("athletes").doc().set(params),
        get : () => this.db.collection("athletes").get(),
        delete : (param) => this.db.collection("athletes").doc(param).delete()
    }
}


export default Firebase;