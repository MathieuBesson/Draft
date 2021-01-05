import React, { useState, Fragment } from 'react';
import AdminCommandes from './Commandes';
import AdminProducts from './Products';
import Header from '../Header';



const Admin = (props) => {

    const [currentComponent, setCurrentComponent] = useState(0)
    return (
        <>
        <Header />
        <div className="container" style={{ marginTop: "150px" }}>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class={"nav-link " + (currentComponent === 0 ? "active" : "")} style={{cursor: "pointer"}} onClick={() => setCurrentComponent(0)}>Commandes</a>
                </li>
                <li class="nav-item">
                    <a class={"nav-link " + (currentComponent === 1 ? "active" : "")} style={{cursor: "pointer"}} onClick={() => setCurrentComponent(1)}>Produits</a>
                </li>

            </ul>
            {currentComponent === 0 && <AdminCommandes />}
            {currentComponent === 1 && <AdminProducts />}
        </div>
        </>
    );
}

export default Admin;