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

    user = uid => this.db.doc(`user/${uid}`);

    products = {
        set : (params) => this.db.collection("snow").doc().set(params),
        get : () => this.db.collection("snow").get(),
        delete : (param) => this.db.collection("snow").doc(param).delete()
    }

}

export default Firebase;