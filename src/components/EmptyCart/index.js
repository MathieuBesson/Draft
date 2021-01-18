import React from 'react';
import { Link } from "react-router-dom"
import Button from 'components/Button'
import './EmptyCart.scss'

const EmptyCart = () => {
    return (
        <article className="empty-cart">
            <h2 className="third-title">Votre panier est vide...</h2>
            <p className="empty-cart-content">Il semblerait que votre panier soit vide, nous vous invitons à découvrir nos produits et à revenir plus tard !</p>
            <Link to="/shop"><Button type="btn-first" >Découvrir nos produits</Button></Link>
        </article>
    );
}

export default EmptyCart;