import React from 'react';
import './Card.scss';

const Card = ({ children, keyCard, style, type }) => {
    return (
        <section key={keyCard} className={type + ' card'} style={style}>
            {children}
        </section>
    );
}

export default Card;