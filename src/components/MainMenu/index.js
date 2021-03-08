import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserSessionContext from '../../helpers/UserSession';
import { FirebaseContext } from '../../helpers/Firebase';
import Button from 'components/Button';
import './MainMenu.scss';


const MainMenu = ({cartLenght, type}) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);
    const [openBurger, setOpenBurger] = useState(false);

    const handleClickLogOut = e => {
        firebase.signoutUser();
    }

    return (
        <>
            <div className={"menu menu-" + type}>
                <div className={(openBurger ? 'open': '') + " menu__burger"} onClick={() => setOpenBurger(!openBurger)}>
                    <span className="menu__burger-row"></span>
                    <span className="menu__burger-row"></span>
                    <span className="menu__burger-row"></span>
                </div>
                <nav className="container menu__nav">
                    <NavLink className="menu__nav-link" to="/">
                        <img style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo.svg'} alt="DRAFT logo"/>
                    </NavLink>
                    <ul className={(openBurger ? 'open': '') + " menu__nav-bar "}>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" activeClassName='is-active' to="/athletes">Athlètes</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" activeClassName='is-active' to="/shop">Shop</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link cart-nav" activeClassName='is-active' to="/panier">
                                <img src={process.env.PUBLIC_URL + '/cart.svg'} alt="cart icon"/>
                                {cartLenght !== 0 && <span className="menu__nav-link-cart-number">{cartLenght}</span>}
                            </NavLink>
                        </li>
                        {!!user.userData ?
                            <li className="menu__nav-item">
                                <Button type="btn-third" className="menu__nav-link" 
                                clickAction={handleClickLogOut}
                                >Deconnexion</Button>
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