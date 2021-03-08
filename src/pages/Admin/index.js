import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminCommandes from 'components/AdminCommandes';
import AdminProducts from 'components/AdminProducts';
import AdminAthletes from 'components/AdminAthletes'
import MainMenu from 'components/MainMenu';
import UserSessionContext from 'helpers/UserSession'
import Loader from 'components/Loader'




const Admin = ({ cartLenght, isConnected }) => {

    const [currentComponent, setCurrentComponent] = useState(0)
    const user = useContext(UserSessionContext);
    const history = useHistory();

    useEffect(() => {
        if (!isConnected || user.userData.role !== 'admin') {
            history.push({
                pathname: '/',
            })
        }
        return (() => {

        })
    }, [isConnected, user, history]);


    return (
        <>
            {isConnected === "not-connected" || !isConnected ?
                <Loader />
                :
                <>
                    <MainMenu cartLenght={cartLenght} type={'plain'} />
                    <div className="container" style={{ marginTop: "150px" }}>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <button className={"nav-link " + (currentComponent === 0 ? "active" : "")} style={{ cursor: "pointer" }} onClick={(e) => {
                                    e.preventDefault(); setCurrentComponent(0)}}>Commandes</button>
                            </li>
                            <li className="nav-item">
                                <button className={"nav-link " + (currentComponent === 1 ? "active" : "")} style={{ cursor: "pointer" }} onClick={(e) => {
                                    e.preventDefault(); setCurrentComponent(1)}}>Produits</button>
                            </li>
                            <li className="nav-item">
                                <button className={"nav-link " + (currentComponent === 2 ? "active" : "")} style={{ cursor: "pointer" }} onClick={(e) => {
                                    e.preventDefault(); setCurrentComponent(2)}}>Athletes</button>
                            </li>
                        </ul>
                        {currentComponent === 0 && <AdminCommandes />}
                        {currentComponent === 1 && <AdminProducts />}
                        {currentComponent === 2 && <AdminAthletes />}
                    </div>
                </>
            }
        </>
    );
}

export default Admin;