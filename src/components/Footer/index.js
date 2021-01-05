import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss'

const Footer = (props) => {
    return (
        <footer className={"footer section fp-auto-height " + (!!props.type && props.type)}>
            <ul className="footer__group">
                <li>Mentions légales</li>
                <li>Confidentialité</li>
                <li>Copyright - 2021</li>
            </ul>
            <img style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo-dark.svg'} />
            <ul className="footer__group">
                <li className="footer__network" ><img src={process.env.PUBLIC_URL + '/youtube-icon.svg'} /></li>
                <li className="footer__network" ><img src={process.env.PUBLIC_URL + '/instagram-icon.svg'} /></li>
                <li className="footer__network" ><img src={process.env.PUBLIC_URL + '/facebook-icon.svg'} /></li>
            </ul>
        </footer>
    );
}

export default Footer;