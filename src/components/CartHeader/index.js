import React from 'react';
import './CartHeader.scss'

const CartHeader = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { content: '1. Votre panier', class: 'cart' },
        { content: '2. Vos informations', class: 'infos' },
        { content: '3. Paiement', class: 'payement' },
    ];
    return (
        <header className="cart-header">
            {tabs.map(item => (
                <h2 className={`third-title ${(activeTab !== item.class) ? "cart-title-disabled" : ""}`} onClick={() => setActiveTab(item.class)}>{item.content}<span className="red-point">.</span></h2>
            ))}
        </header>
    );
}

export default CartHeader;