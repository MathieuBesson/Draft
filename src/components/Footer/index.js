import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss'

const Footer = (props) => {
    return (
        <footer className="footer section fp-auto-height">
            <ul className="footer__group">
                <li>Mentions légales</li>
                <li>Confidentialité</li>
                <li>Copyright - 2021</li>
            </ul>
            <img className="footer__group" style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo-dark.svg'} />
            <ul className="footer__group footer__network">
                <li><img src={process.env.PUBLIC_URL + '/icons/youtube-icon.svg'} /></li>
                <li><img src={process.env.PUBLIC_URL + '/icons/instagram-icon.svg'} /></li>
                <li><img src={process.env.PUBLIC_URL + '/icons/facebook-icon.svg'} /></li>
            </ul>
        </footer>
    );
}

export default Footer;