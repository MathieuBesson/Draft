import React from 'react';
import './Footer.scss'

const Footer = () => {
    return (
        <footer className="footer section fp-auto-height">
            <ul className="footer__group legal">
                <li>Mentions légales</li>
                <li>Confidentialité</li>
                <li>Copyright - 2021</li>
            </ul>
            <img className="footer__group" style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo-dark.svg'} alt="logo DRAFT dark"/>
            <ul className="footer__group footer__network">
                <li><img src={process.env.PUBLIC_URL + '/icons/youtube-icon.svg'} alt="youtube icon"/></li>
                <li><img src={process.env.PUBLIC_URL + '/icons/instagram-icon.svg'} alt="instagram icon"/></li>
                <li><img src={process.env.PUBLIC_URL + '/icons/facebook-icon.svg'} alt="facebook icon"/></li>
            </ul>
        </footer>
    );
}

export default Footer;