import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from 'helpers/Firebase'
import './Login.scss'


const Login = (props) => {

    const data = {
        loginEmail: {
            content: '',
            error: false,
            textError: null
        },
        loginPassword: {
            content: '',
            error: false,
            textError: null
        },
    }
    let history = useHistory()

    const firebase = useContext(FirebaseContext);

    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('');

    const handleData = e => {

        let currentField = loginCondition[e.target.id];
        let error = false;
        let textError = null;
        if (!currentField.condition(e.target.value)) {
            error = true;
            textError = currentField.errorMsg;
        }

        setLoginData({
            ...loginData, [e.target.id]: {
                content: e.target.value,
                error,
                textError
            }
        })
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        firebase.loginUser(loginData.loginEmail.content, loginData.loginPassword.content)
        .then(user => {
            setLoginData(data);
            history.push('/');
        })
        .catch(error => {
            setError(error);
            setLoginData(data);
        })
    } 

    let loginCondition = {
        'loginEmail': {
            condition: (email = loginData.loginEmail.content) => (email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) ? true : false),
            errorMsg: 'Votre email n\'est pas valide'
        },
        'loginPassword': {
            condition: (password = loginData.loginPassword.content) => (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\.@#\\$%\\^&amp;\\*])(?=.{8,})/) ? true : false),
            errorMsg: 'Votre mot de passe doit contenir au minimum: 1 caractère alphabétique minuscule, 1 caractère alphabétique majuscule, un chiffre, un caractère spécial et au moins 8 caractères au total'
        },
    }

    const btnSubmit =
            loginCondition.loginEmail.condition() &&
            loginCondition.loginPassword.condition()
            ? <button type="submit" className="btn-first">Connexion</button>
            : <button type="submit" className="btn-first disabled" aria-disabled="true" disabled>Connexion</button>

    const errorMsg = error !== '' && <div className="alert alert-danger" role="alert">{error.message}</div>

    return (
        <form onSubmit={handleSubmit} className={'auth-form ' + (props.display && 'active-content')}>
            {errorMsg}

                <input type="email" value={loginData.loginEmail.content} onChange={handleData} className="input" id="loginEmail" placeholder="Adresse e-mail" />
                {loginData.loginEmail.error && <small id="emailHelp" className="form-text text-danger">{loginData.loginEmail.textError}</small>}

                <input type="password" value={loginData.loginPassword.content} onChange={handleData} className="input" id="loginPassword" placeholder="Mot de passe" />
                {loginData.loginPassword.error && <small id="emailHelp" className="form-text text-danger">{loginData.loginPassword.textError}</small>}

            {btnSubmit}
            <small id="emailHelp" className="form-text text-muted">Pas de compte ? <span className="auth-form__link" onClick={() => props.tabChoice('signUp')}>Inscrivez-vous</span></small>
            <small id="emailHelp" className="form-text text-muted"><Link className="auth-form__link" to="/mot-de-passe-oublie">Mot de passe oublié</Link></small>
        </form>
    );
}

export default Login;