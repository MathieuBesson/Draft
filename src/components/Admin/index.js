import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminCommandes from './Commandes';
import AdminProducts from './Products';
import AdminAthletes from './Athletes'
import Header from '../Header';
import UserSessionContext from '../UserSession'



const Admin = (props) => {

    const [currentComponent, setCurrentComponent] = useState(0)
    const userSession = useContext(UserSessionContext);
    const history = useHistory()


    useEffect(() => {
        if (userSession.userData ===null || userSession.userData.role !== 'admin') {
            history.push({
                pathname: '/',
            })
        }
    }, [userSession, history]);


    return (
        <>
        <Header cartLenght={props.cartLenght} background={{backgroundColor: "#1B2B40"}}/>
        <div className="container" style={{ marginTop: "150px" }}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={"nav-link " + (currentComponent === 0 ? "active" : "")} style={{cursor: "pointer"}} onClick={() => setCurrentComponent(0)}>Commandes</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link " + (currentComponent === 1 ? "active" : "")} style={{cursor: "pointer"}} onClick={() => setCurrentComponent(1)}>Produits</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link " + (currentComponent === 2 ? "active" : "")} style={{cursor: "pointer"}} onClick={() => setCurrentComponent(2)}>Athletes</a>
                </li>
            </ul>
            {currentComponent === 0 && <AdminCommandes />}
            {currentComponent === 1 && <AdminProducts />}
            {currentComponent === 2 && <AdminAthletes />}
        </div>
        </>
    );
}

export default Admin;