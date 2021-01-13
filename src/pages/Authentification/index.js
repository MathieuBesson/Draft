import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import Header from 'components/Header';
import Footer from 'components/Footer';
import './Authentification.scss'


const Authentification = ({location, isConnected, cartLenght}) => {

    const [tabAuthentification, settabAuthentification] = useState('login');
    const [errorMessage, setUserMessage] = useState(null)
    const history = useHistory()

    useEffect(() => {
        setUserMessage(!!location.state ? location.state.errorMessage : '');
        if (isConnected) {
            history.push({
                pathname: '/',
            })
        }
    }, [isConnected, history]);

    const activeClass = (type) => {
        return type === tabAuthentification ? 'active-link' : '';
    }

    return (
        <>
            <Header cartLenght={cartLenght}  background={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"}}/>
            <article className="authentification" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/auth-bg.jpg')` }}>
                <div className="card">
                    <div className="card-head">
                        <h2 className={`authentification__title ${activeClass('login')}`} onClick={() => settabAuthentification('login')}>Connexion</h2>
                        <h2 className={`authentification__title ${activeClass('signUp')}`} onClick={() => settabAuthentification('signUp')}>Inscription</h2>
                    </div>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <Login display={tabAuthentification === 'login'} tabChoice={(choice) => settabAuthentification(choice)} />
                    <SignUp display={tabAuthentification === 'signUp'} tabChoice={(choice) => settabAuthentification(choice)} />
                </div>
            </article>
            <Footer/>
        </>
    );
}

export default Authentification;