import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import MainMenu from 'components/MainMenu';
import Footer from 'components/Footer';
import Header from 'components/Header';

import './ErrorPage.scss'

const ErrorPage = ({cartLenght}) => {
    return (
        <>
            <MainMenu type={'gradient'} cartLenght={cartLenght}/>
            <Header type="error-page" backgroundUrl={process.env.PUBLIC_URL +'/404.jpg'}>
                <p className="error-page__content">Vous êtes visiblement perdu…</p>
                <Link className="btn-first" to="/">Retouner à la page d'acceuil</Link>
            </Header>
            <Footer />

        </>
    );
}

export default ErrorPage;