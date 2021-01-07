import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './ErrorPage.scss'

const ErrorPage = () => {
    return (
        <>
            <Header background={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)"}}/>
            <article className="error-page" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/404.jpg')` }}>
                <p className="error-page__content">Vous êtes visiblement perdu…</p>
                <Link className="btn-first" to="/">Retouner à la page d'acceuil</Link>
            </article>
            <Footer type="normal" />

        </>
    );
}

export default ErrorPage;