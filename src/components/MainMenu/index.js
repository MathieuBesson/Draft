import React, { Fragment, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserSessionContext from '../../helpers/UserSession';
import { FirebaseContext } from '../../helpers/Firebase';
import Button from 'components/Button';
import './MainMenu.scss';


const MainMenu = ({cartLenght, type}) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);

    const handleClickLogOut = e => {
        firebase.signoutUser()
    }


    return (
        <>
            <div className={"menu menu-" + type}>
                <nav className="container">
                    <NavLink className="menu__nav-link" to="/">
                        <img style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo.svg'} />
                    </NavLink>
                    <ul className="menu__nav-bar">
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" activeClassName='is-active' to="/athletes">Athlètes</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" activeClassName='is-active' to="/shop">Shop</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link cart-nav" activeClassName='is-active' to="/panier">
                                <img src={process.env.PUBLIC_URL + '/cart.svg'} />
                                {cartLenght !== 0 && <span className="menu__nav-link-cart-number">{cartLenght}</span>}
                            </NavLink>
                        </li>
                        {!!user.userData ?
                            <li className="menu__nav-item">
                                <a className="menu__nav-link" onClick={handleClickLogOut}><Button type="btn-third">Deconnexion</Button></a>
                            </li> :
                            <li className="menu__nav-item">
                                <NavLink className="menu__nav-link" activeClassName='is-active' to="/authentification"><Button type="btn-third">Connexion - Inscription</Button></NavLink>
                            </li>
                        }
                        {(user.userData !== null && user.userData.role === "admin") &&
                            <li className="menu__nav-item">
                                <NavLink className="menu__nav-link" activeClassName='is-active' to="/admin">Administration</NavLink>
                            </li>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default MainMenu;