import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from '../Firebase'
import './SignUp.scss'
import { useHistory } from 'react-router-dom';


const SignUp = (props) => {

    //ttM5.....

    const firebase = useContext(FirebaseContext);
    const history = useHistory()

    let formValues = { 'signUpLastName': {}, 'signUpFirstName': {}, 'signUpEmail': {}, 'signUpPassword': {}, 'signUpPasswordConfirm': {} };
    for (const item in formValues) {
        formValues[item] = {
            content: '',
            error: false,
            textError: null
        }
    }

    const [signUpData, setsignUpData] = useState(formValues);
    const [error, setError] = useState('');

    const { signUpLastName, signUpFirstName, signUpEmail, signUpPassword, signUpPasswordConfirm } = signUpData

    let signUpCondition = {
        'signUpLastName': {
            condition: (lastName = signUpLastName.content) => lastName.length > 2,
            errorMsg: 'Votre nom doit faire au minimum 3 caractères'
        },
        'signUpFirstName': {
            condition: (firstName = signUpFirstName.content) => firstName.length > 2,
            errorMsg: 'Votre prénom doit faire au minimum 3 caractères'
        },
        'signUpEmail': {
            condition: (email = signUpEmail.content) => (email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) ? true : false),
            errorMsg: 'Votre email n\'est pas valide'
        },
        'signUpPassword': {
            condition: (password = signUpPassword.content) => (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\.@#\\$%\\^&amp;\\*])(?=.{8,})/) ? true : false),
            errorMsg: 'Votre mot de passe doit contenir au minimum: 1 caractère alphabétique minuscule, 1 caractère alphabétique majuscule, un chiffre, un caractère spécial et au moins 8 caractères au total'
        },
        'signUpPasswordConfirm': {
            condition: (confirm = signUpPasswordConfirm.content) => signUpPassword.content === confirm,
            errorMsg: 'Les deux mots de passe ne sont pas identiques'
        }
    }

    const handleChange = e => {
        let currentField = signUpCondition[e.target.id];
        let error = false;
        let textError = null;
        if (!currentField.condition(e.target.value)) {
            error = true;
            textError = currentField.errorMsg;
        }

        setsignUpData({
            ...signUpData, [e.target.id]: {
                ...signUpData[e.target.id],
                content: e.target.value,
                error,
                textError
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        firebase.signupUser(signUpData.signUpEmail.content, signUpData.signUpPassword.content)
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({
                    lastName: signUpLastName.content,
                    firstName: signUpFirstName.content,
                    email: signUpEmail.content,
                    role: 'user'
                })
            })
            .then(() => {
                setsignUpData({ ...formValues })
                history.push('/');
            })
            .catch(error => {
                setError(error)
                setsignUpData({ ...formValues })
            })
    }

    const btnSubmit =
        signUpCondition.signUpLastName.condition() &&
            signUpCondition.signUpFirstName.condition() &&
            signUpCondition.signUpEmail.condition() &&
            signUpCondition.signUpPassword.condition() &&
            signUpCondition.signUpPasswordConfirm.condition()
            ? <button type="submit" className="btn-first">Inscription</button>
            : <button type="submit" className="btn-first disabled" aria-disabled="true" disabled>Inscription</button>


    const errorMsg = error !== '' && <div className="alert alert-danger" role="alert">{error.message}</div>

    return (
        <form onSubmit={handleSubmit} className={'auth-form ' + (props.display && 'active-content')}>
            {errorMsg}
            <input onChange={handleChange} value={signUpLastName.content} type="text" className="input" id="signUpLastName" placeholder="Nom" required />
            {signUpData.signUpLastName.error && <small id="emailHelp" className="form-text text-danger">{signUpData.signUpLastName.textError}</small>}

            <input onChange={handleChange} value={signUpFirstName.content} type="text" className="input" id="signUpFirstName" placeholder="Prénom" required />
            {signUpData.signUpFirstName.error && <small id="emailHelp" className="form-text text-danger">{signUpData.signUpFirstName.textError}</small>}

            <input onChange={handleChange} value={signUpEmail.content} type="email" className="input" id="signUpEmail" placeholder="Adresse e-mail" required />
            {signUpData.signUpEmail.error && <small id="emailHelp" className="form-text text-danger">{signUpData.signUpEmail.textError}</small>}


            <input onChange={handleChange} value={signUpPassword.content} type="password" className="input" id="signUpPassword" placeholder="Mot de passe" required />
            {signUpData.signUpPassword.error && <small id="emailHelp" className="form-text text-danger">{signUpData.signUpPassword.textError}</small>}

            <input onChange={handleChange} value={signUpPasswordConfirm.content} type="password" className="input" id="signUpPasswordConfirm" placeholder="Confirmation du mot de passe" required />
            {signUpData.signUpPasswordConfirm.error && <small id="emailHelp" className="form-text text-danger">{signUpData.signUpPasswordConfirm.textError}</small>}

            {btnSubmit}
            <small id="emailHelp" className="form-text text-muted">Déjà inscrit ?  <span className="auth-form__link" onClick={() => props.tabChoice('login')}>Connectez-vous</span></small>
        </form>
    );
}

export default SignUp;