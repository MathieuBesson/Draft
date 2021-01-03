import React, { useState } from 'react';
import Login from '../Login';
import SignUp from '../SignUp';

const Authentification = (props) => {

    const [toggleAuthentification, settoggleAuthentification] = useState('login');

    const toggleHandler = (choice) => {
        settoggleAuthentification(choice)
    }

    let errorMessage = null;
    
    if(![null, undefined].includes(props.location.state)){
        errorMessage = props.location.state.errorMessage;
        window.history.replaceState(null, '')
    }

    const activeClass = (type) => {
        return type === toggleAuthentification ? 'active-link' : '';
    }

    return (
        <div>
            <h2>Authentification</h2>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <span className={activeClass('login') + " mr-5"} onClick={() => toggleHandler('login')}>Connexion</span>
            <span className={activeClass('signUp')} onClick={() => toggleHandler('signUp')}>Inscription</span>
            <Login history={props.history} display={toggleAuthentification === 'login'} tabChoice={(choice) => toggleHandler(choice)} />
            <SignUp history={props.history} display={toggleAuthentification === 'signUp'} tabChoice={(choice) => toggleHandler(choice)} />
        </div>
    );
}

export default Authentification;