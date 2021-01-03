import React, {useContext, useHistory } from 'react';
import { FirebaseContext } from '../Firebase'

const LogOut = (props) => {

    const firebase = useContext(FirebaseContext);

    const handleClick = e => {
        firebase.signoutUser()
    }
        
 
    return (
        <button className="btn btn-primary" onClick={handleClick}>Deconnexion</button>
    );
}

export default LogOut;