import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center d-flex flex-column" id="main">
                <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Error-512.png" style={{height: "250px", width: "250px"}} alt="Page erreur"></img>
                <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center mt-5">404</h1>
                <div className="col-4 d-flex justify-content-center text-center flex-column">
                    <h2 className="font-weight-normal lead mb-3" id="desc">The page you requested was not found.</h2>
                    <Link className="btn btn-success text-center w-50 m-auto " to="/">Retouner à la page d'acceuil</Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;