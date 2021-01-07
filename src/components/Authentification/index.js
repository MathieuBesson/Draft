import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Login from '../Login';
import SignUp from '../SignUp';
import Header from '../Header';
import Footer from '../Footer';
import UserSessionContext from '../UserSession'
import './Authentification.scss'


const Authentification = (props) => {

    const [toggleAuthentification, settoggleAuthentification] = useState('login');
    const userSession = useContext(UserSessionContext);
    const history = useHistory()


    const toggleHandler = (choice) => {
        settoggleAuthentification(choice)
    }

    useEffect(() => {
        if (userSession.userSession !== null) {
            history.push({
                pathname: '/',
            })
        }
        return () => {

        }
    }, [userSession, history]);

    let errorMessage = null;

    if (![null, undefined].includes(props.location.state)) {
        errorMessage = props.location.state.errorMessage;
        window.history.replaceState(null, '')
    }

    const activeClass = (type) => {
        return type === toggleAuthentification ? 'active-link' : '';
    }

    return (
        <>
            <Header background={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"}}/>
            <article className="authentification" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/auth-bg.jpg')` }}>
                <div className="card">
                    <div className="card-head">
                        <h2 className={`authentification__title ${activeClass('login')}`} onClick={() => toggleHandler('login')}>Connexion</h2>
                        <h2 className={`authentification__title ${activeClass('signUp')}`} onClick={() => toggleHandler('signUp')}>Inscription</h2>
                    </div>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <Login display={toggleAuthentification === 'login'} tabChoice={(choice) => toggleHandler(choice)} />
                    <SignUp display={toggleAuthentification === 'signUp'} tabChoice={(choice) => toggleHandler(choice)} />
                </div>
            </article>
            <Footer type="normal"/>
        </>
    );
}

export default Authentification;