import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="pt-4 my-md-5 pt-md-5 border-top container">
            <div className="row">
                <div className="col-12 col-md">
                    <img className="mb-2" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="Boottsrap" width="24" height="24" />
                    <small className="d-block mb-3 text-muted">&copy; 2017-2018</small>
                </div>
                <div className="col-6 col-md">
                    <h5>Mieux nous connaitre</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="text-muted" to="/">Team</Link></li>
                        <li><Link className="text-muted" to="/collaborations">Collaborations</Link></li>
                        <li><Link className="text-muted" to="/">Instagram</Link></li>
                        <li><Link className="text-muted" to="/">Facebook</Link></li>
                        <li><Link className="text-muted" to="/">Twitter</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>Architecture</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="text-muted" to="/products">Produits</Link></li>
                        <li><Link className="text-muted" to="/collaborations">Collaboration</Link></li>
                        <li><Link className="text-muted" to="/panier">Panier</Link></li>
                        <li><Link className="text-muted" to="/authentification">Connexion - Inscription</Link></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>A propos</h5>
                    <ul className="list-unstyled text-small">
                        <li><Link className="text-muted" to="/">Resource</Link></li>
                        <li><Link className="text-muted" to="/">Mentions légales</Link></li>
                        <li><Link className="text-muted" to="/">CGU</Link></li>
                        <li className="text-muted">© Snow Board App 2020</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;