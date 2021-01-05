import React, { Fragment, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserSessionContext from '../UserSession'
import './Header.scss'


const Header = () => {

    const user = useContext(UserSessionContext);

    return (
        <>
            <div className="menu">
                <nav className="container">
                    <NavLink className="menu__nav-link" to="/">
                        <img style={{ height: "40px", width: "153px" }} src={process.env.PUBLIC_URL + '/logo.svg'} />
                    </NavLink>
                    <ul className="menu__nav-bar">
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" to="/athletes">Athlètes</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" to="/shop">Shop</NavLink>
                        </li>
                        <li className="menu__nav-item">
                            <NavLink className="menu__nav-link" to="/panier">
                                <img src={process.env.PUBLIC_URL + '/cart.svg'} />
                            </NavLink>
                        </li>
                        {!!user.userData ?
                            <li className="menu__nav-item">
                                <NavLink className="menu__nav-link" to="/mon-compte">Mon compte</NavLink>
                            </li> :
                            <li className="menu__nav-item">
                                <NavLink className="menu__nav-link" to="/authentification">Connexion - Inscription</NavLink>
                            </li>
                        }
                        {(user.userData !== null && user.userData.role === "admin") &&
                            <>
                                <li className="menu__nav-item">
                                    <NavLink className="menu__nav-link" to="/admin">Administration</NavLink>
                                </li>
                                
                            </>
                        }
                    </ul>
                </nav>
            </div>
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container">
                    <img style={{height: "40px", width: "153px"}} src={process.env.PUBLIC_URL + '/logo.svg'} /> 
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/collaborations">Collaboration</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/panier">BackPack</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/produits">Produits</NavLink>
                            </li>
                            {(user.userData !== null && user.userData.role === "admin") &&
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/admin/commandes">AdminCommandes</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/admin/produits">AdminProduits</NavLink>
                                    </li>
                                </>
                            }
                            {user.userSession === null &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/authentification">Connexion - Inscription</NavLink>
                                </li>}
                            {user.userSession !== null &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/mon-compte">Mon compte</NavLink>
                                </li>}
                        </ul>
                    </div>
                </div>
            </nav> */}
            {/* <div className="jumbotron bg-cover text-white" style={{ background: "url(https://i.postimg.cc/3N7wnb75/background.jpg) center center no-repeat", backgroundSize: "cover", borderRadius: "0" }}>
                <div className="container py-5 text-center">
                    <h1 className="display-4 font-weight-bold mb-3">Snow Board App</h1>
                    <p className="font-italic w-50 text-center m-auto ">ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                    <NavLink to="/" role="button" className="btn btn-primary px-5 mt-5">Voir nos produit</NavLink>
                </div>
            </div> */}
        </>
    );
}

export default Header;