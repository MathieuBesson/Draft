import React from 'react';
import Card from 'components/Card'
import './OrderSummary.scss'

const OrderSummary = ({total, deliveryPlaceStation, deliveryPlaceHome}) => {

    function DateToString(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString()
    }

    return (
        <div className="order-summary">
            <Card>
                <h2 className="third-title">Recapitulatif<span className="red-point">.</span></h2>
                <div className="order-summary-group">
                    <span className="card-content">Sous-total</span>
                    <span className="card-content">{total}€</span>
                </div>
                <div className="order-summary-group">
                    <span className="card-content">Livraison</span>
                    <span className="card-content">Gratuite</span>
                </div>
                <div className="order-summary-group">
                    <span className="card-content">Lieu</span>
                    <span className="card-content text-right ml-5">{!deliveryPlaceStation ? Object.keys(deliveryPlaceHome).map((key) => deliveryPlaceHome[key] + " ") : deliveryPlaceStation}</span>
                </div>
                <div className="order-summary-group">
                    <span className="card-content">Date</span>
                    <span className="card-content">{DateToString(Date.now() + 1000 * 60 * 60 * 24 * 5)}</span>
                </div>
                <hr />
                <div className="order-summary-group">
                    <span className="card-title">Total</span>
                    <span className="card-title">{total}€</span>
                </div>
            </Card>
            <ul className="order-summary-list">
                <li>
                    <img src={`${process.env.PUBLIC_URL}/paiement1.svg`} />
                    <span>Paiement Sécurisé</span>
                </li>
                <li>
                    <img src={`${process.env.PUBLIC_URL}/paiement2.svg`} />
                    <span>Retour sous 30 jours</span>
                </li>
                <li>
                    <img src={`${process.env.PUBLIC_URL}/paiement3.svg`} />
                    <span>Livraison Gratuite</span>
                </li>
            </ul>
        </div>
    );
}

export default OrderSummary;