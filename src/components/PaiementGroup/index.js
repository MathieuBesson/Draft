import React from 'react';
import Button  from 'components/Button';
import './PaiementGroup.scss'

const PaiementGroup = ({cardBank, handleCardBank, handleCommand}) => {
    return (
        <article className="cart-payement">
            <h3 className="card-title">Informations de paiement</h3>
            <div className="cart-payement-group">
                <div className="cart-payement-group-inputs">
                    <input className="input" type="text" placeholder="Titutaire de la carte" onChange={(e) => handleCardBank({ ...cardBank, owner: e.target.value })} />
                    <input className="input" type="number" placeholder="0000 0000 0000 0000" onChange={(e) => handleCardBank({ ...cardBank, number: e.target.value })} />
                    <div className="cart-payement-group-list">
                        <input className="input" type="text" placeholder="Date de validité (00/00)" onChange={(e) => handleCardBank({ ...cardBank, validDate: e.target.value })} />
                        <input className="input" type="text" placeholder="CVC" onChange={(e) => handleCardBank({ ...cardBank, CVC: e.target.value })} />
                    </div>
                </div>
                <div className="cart-payement-bank-card" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/bank-card.svg')` }}>
                    <span className="bank-card-number">{cardBank.number}</span>
                    <span className="bank-card-owner">M. / Mme {cardBank.owner}</span>
                    <span className="bank-card-validDate">{cardBank.validDate}</span>
                    <span className="bank-card-CVC">{cardBank.CVC}</span>
                </div>
            </div>
            <Button type="btn-first" clickAction={handleCommand}>Payer</Button>
        </article>
    );
}

export default PaiementGroup;