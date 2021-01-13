import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../helpers/Firebase'


const ForgetPassword = () => {

    const firebase = useContext(FirebaseContext);
    let history = useHistory();

    const data = {
        email: {
            content: '',
            error: false,
            textError: null,
            errorMsg: 'Votre email n\'est pas valide'
        },
    }

    const [forgetData, setforgetData] = useState(data);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const conditions = {
        email: {
            condition: (email = forgetData.email.content) => (email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) ? true : false),
            errorMsg: 'Votre email n\'est pas valide'
        }
    }

    const handleData = e => {

        let currentField = conditions.email;
        let error = false;
        let textError = null;
        if (!currentField.condition(e.target.value)) {
            error = true;
            textError = currentField.errorMsg;
        }

        setforgetData({
            ...forgetData, email: {
                content: e.target.value,
                error,
                textError
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(forgetData.email.content)
            .then(() => {
                setError('');
                setSuccess(`Consulter votre e-mail ${forgetData.email.content} pour changer de mot de passe`);
                setTimeout(() => {
                    history.push('/authentification')
                }, 5000)
            })
            .catch(error => {
                setSuccess('');
                setError(error);
                setforgetData(data);
            })
    }

    const btnSubmit = conditions.email.condition()
        ? <button type="submit" className="btn btn-primary">Récupérer</button>
        : <button type="submit" className="btn btn-primary disabled" aria-disabled="true" disabled>Récupérer</button>

    const errorMsg = error !== '' && <div className="alert alert-danger" role="alert">{error.message}</div>
    const successMsg = success !== '' && <div className="alert alert-success" role="alert">{success}</div>



    return (
        <>
            <h2>Mot de passe oublié</h2>
            <form onSubmit={handleSubmit}>
                {errorMsg}
                {successMsg}
                <div className="form-group">
                    <label htmlFor="email">Adresse e-mail</label>
                    <input type="email" value={forgetData.email.content} onChange={handleData} className="form-control" id="email" placeholder="jean.dupond@monmail.com" />
                    {forgetData.email.error && <small id="emailHelp" className="form-text text-danger">{forgetData.email.textError}</small>}
                    <small id="emailHelp" className="form-text text-muted">Déjà inscrit ? <Link to="/authentification">Connectez-vous</Link></small>
                </div>
                {btnSubmit}
            </form>

        </>
    );
}

export default ForgetPassword;