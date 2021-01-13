import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminCommandes from '../../components/AdminCommandes';
import AdminProducts from '../../components/AdminProducts';
import AdminAthletes from '../../components/AdminAthletes'
import Header from '../../components/Header';
import UserSessionContext from 'helpers/UserSession'



const Admin = ({cartLenght, isConnected}) => {

    const [currentComponent, setCurrentComponent] = useState(0)
    const user = useContext(UserSessionContext);
    const history = useHistory()


    useEffect(() => {
        if (!isConnected || user.userData.role !== 'admin') {
            history.push({
                pathname: '/',
            })
        }
        return (() => {

        })
    }, [user, history]);


    return (
        <>
        <Header cartLenght={cartLenght} background={{backgroundColor: "#1B2B40"}}/>
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