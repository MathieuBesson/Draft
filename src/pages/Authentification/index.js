import React, { useState, Fragment, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import MainMenu from 'components/MainMenu';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Card from 'components/Card';

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
            <MainMenu cartLenght={cartLenght}  type={'gradient'}/>
            <Header type="authentification" backgroundUrl={process.env.PUBLIC_URL +'/auth-bg.jpg'}>
                <Card className="card">
                    <div className="card-head">
                        <h2 className={`authentification__title ${activeClass('login')}`} onClick={() => settabAuthentification('login')}>Connexion</h2>
                        <h2 className={`authentification__title ${activeClass('signUp')}`} onClick={() => settabAuthentification('signUp')}>Inscription</h2>
                    </div>
                    {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                    <Login display={tabAuthentification === 'login'} tabChoice={(choice) => settabAuthentification(choice)} />
                    <SignUp display={tabAuthentification === 'signUp'} tabChoice={(choice) => settabAuthentification(choice)} />
                </Card>
            </Header>
            <Footer/>
        </>
    );
}

export default Authentification;