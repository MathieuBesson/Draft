import React, { Fragment, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserSessionContext from '../../helpers/UserSession'
import { FirebaseContext } from '../../helpers/Firebase'
import './Header.scss'


const Header = ({background, cartLenght}) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);
    
    const handleClickLogOut = e => {
        firebase.signoutUser()
    }
        

    return (
        <>
        {console.log(background)}
            <div className="menu" style={background}>
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
                                <a className="menu__nav-link" onClick={handleClickLogOut}>Deconnexion</a>

                            </li> :
                            <li className="menu__nav-item">
                                <NavLink className="menu__nav-link" activeClassName='is-active' to="/authentification">Connexion - Inscription</NavLink>
                            </li>
                        }
                        {(user.userData !== null && user.userData.role === "admin") &&
                            <>
                                <li className="menu__nav-item">
                                    <NavLink className="menu__nav-link" activeClassName='is-active' to="/admin">Administration</NavLink>
                                </li>
                                
                            </>
                        }
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Header;