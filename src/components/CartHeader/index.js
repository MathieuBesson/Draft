import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './CartHeader.scss'

const CartHeader = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { content: '1. Votre panier', class: 'cart', iconPath: ['fas', 'cart-arrow-down'] },
        { content: '2. Vos informations', class: 'infos', iconPath: ['fas', 'info-circle'] },
        { content: '3. Paiement', class: 'payement', iconPath: ['fas', 'credit-card'] },
    ];
    return (
        <header className="cart-header">
            {tabs.map((item, id) => (
                <Fragment key={id}>
                    {/* <FontAwesomeIcon icon={['fas', 'cart-arrow-down']} />
                    <FontAwesomeIcon icon={['fas', 'info-circle']} />
                    <FontAwesomeIcon icon={['fas', 'credit-card']} /> */}


                    {/* <i class="fas fa-cart-arrow-down"></i> */}
                    <h2 className={`third-title ${(activeTab !== item.class) ? "cart-title-disabled" : ""}`} onClick={() => setActiveTab(item.class)}>{item.content}<span className="red-point">.</span>
                    </h2>
                    <FontAwesomeIcon 
                        icon={item.iconPath} 
                        className={`cart-header-icon ${(activeTab !== item.class) ? "cart-title-disabled" : ""}`}
                        onClick={() => setActiveTab(item.class)}
                    />

                    {/* <img
                        className={`cart-header-icon ${(activeTab !== item.class) ? "cart-title-disabled" : ""}`}
                        src={`${process.env.PUBLIC_URL}/icons/${item.iconPath}`}
                        alt={item.iconPath.slice(0, item.iconPath.indexOf('.')).replace("-", " ")}
                        onClick={() => setActiveTab(item.class)}
                    /> */}
                    {/* {console.log(item.iconPath.slice(0, item.iconPath.indexOf('.')).replace("-", " "))} */}
                </Fragment>
            ))}
        </header>
    );
}

export default CartHeader;