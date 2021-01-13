import React, { useState, useContext, useEffect } from 'react';
import { FirebaseContext } from 'helpers/Firebase'
import './SignUp.scss'
import { useHistory } from 'react-router-dom';

//ttM5.....

const SignUp = (props) => {

    const firebase = useContext(FirebaseContext);
    const history = useHistory()

    let formValues = {
        signUpLastName: {
            condition: (lengthLastName) => lengthLastName.length > 2,
            errorMsg: 'Votre nom doit faire au minimum 3 caractères'
        },
        signUpFirstName: {
            condition: (lengthFirstName) => lengthFirstName.length > 2,
            errorMsg: 'Votre prénom doit faire au minimum 3 caractères'
        },
        signUpEmail: {
            condition: (email) => (email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) ? true : false),
            errorMsg: 'Votre email n\'est pas valide'
        },
        signUpPassword: {
            condition: (password) => (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\.@#\\$%\\^&amp;\\*])(?=.{8,})/) ? true : false),
            errorMsg: 'Votre mot de passe doit contenir au minimum: 1 caractère alphabétique minuscule, 1 caractère alphabétique majuscule, un chiffre, un caractère spécial et au moins 8 caractères au total'
        },
        signUpPasswordConfirm: {
            condition: (password, passwordConfirm) => password === passwordConfirm,
            errorMsg: 'Les deux mots de passe ne sont pas identiques'
        }
    };
    for (const item in formValues) {
        formValues[item] = {
            ...formValues[item],
            content: '',
            error: false,
            textError: null
        }
    }

    const [signUpData, setsignUpData] = useState(formValues);
    const [error, setError] = useState('');

    const { signUpLastName, signUpFirstName, signUpEmail, signUpPassword, signUpPasswordConfirm } = signUpData


    const handleChange = e => {
        let currentField = signUpData[e.target.id];
        let error = false;
        let textError = null;
        let param = e.target.id === 'signUpPasswordConfirm' ? [signUpData.signUpPassword.content, e.target.value] : [e.target.value]

        if (!currentField.condition(...param)) {
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
        // TODO : Faire vérif qu'il n'y a aucun erreur avant de soumettre
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

    function checkField(){
        return signUpData.signUpLastName.condition(signUpData.signUpLastName.content) &&
        signUpData.signUpFirstName.condition(signUpData.signUpFirstName.content) &&
        signUpData.signUpEmail.condition(signUpData.signUpEmail.content) &&
        signUpData.signUpPassword.condition(signUpData.signUpPassword.content) &&
        signUpData.signUpPasswordConfirm.condition(signUpData.signUpPassword.content, signUpData.signUpPasswordConfirm.content);
    }

    function dangerMsg(message){
        return <small id="emailHelp" className="form-text text-danger">{message}</small>
    }

    return (
        <form onSubmit={handleSubmit} className={'auth-form ' + (props.display && 'active-content')}>
            {error !== '' && <div className="alert alert-danger" role="alert">{error.message}</div>}

            <input onChange={handleChange} value={signUpLastName.content} type="text" className="input" id="signUpLastName" placeholder="Nom" required />
            {signUpData.signUpLastName.error && dangerMsg(signUpData.signUpLastName.textError)}

            <input onChange={handleChange} value={signUpFirstName.content} type="text" className="input" id="signUpFirstName" placeholder="Prénom" required />
            {signUpData.signUpFirstName.error && dangerMsg(signUpData.signUpFirstName.textError)}

            <input onChange={handleChange} value={signUpEmail.content} type="email" className="input" id="signUpEmail" placeholder="Adresse e-mail" required />
            {signUpData.signUpEmail.error && dangerMsg(signUpData.signUpEmail.textError)}

            <input onChange={handleChange} value={signUpPassword.content} type="password" className="input" id="signUpPassword" placeholder="Mot de passe" required />
            {signUpData.signUpPassword.error && dangerMsg(signUpData.signUpPassword.textError)}

            <input onChange={handleChange} value={signUpPasswordConfirm.content} type="password" className="input" id="signUpPasswordConfirm" placeholder="Confirmation du mot de passe" required />
            {signUpData.signUpPasswordConfirm.error && dangerMsg(signUpData.signUpPasswordConfirm.textError)}

            { checkField()
                ? <button type="submit" className="btn-first">Inscription</button>
                : <button type="submit" className="btn-first disabled" aria-disabled="true" disabled>Inscription</button>}
            <small id="emailHelp" className="form-text text-muted">Déjà inscrit ?  <span className="auth-form__link" onClick={() => props.tabChoice('login')}>Connectez-vous</span></small>
        </form>
    );
}

export default SignUp;