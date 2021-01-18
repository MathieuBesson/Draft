import React from 'react';
import Button from 'components/Button';
import './CartDelivery.scss'

const CartDelivery = ({ deliveryPlaceHome, setDeliveryPlaceHome, deliveryPlaceStation, setDeliveryPlaceStation, setActiveTab }) => {
    const deliveryPlacesStations = ["Chamonix-Mont-Blanc", "Val-d'Isère", "La Plagne", "L'Alpe D'Huez", "Les deux Alpes"];

    return (
        <>
            <article className="cart-delivery">
                <section className="cart-delivery-home">
                    <h3 className="card-title">Livraison à domicile</h3>
                    <div className="cart-delivery-home-group">
                        <input className="input" type="text" name="adresse" placeholder="Adresse" value={deliveryPlaceHome.adresse} onChange={(e) => setDeliveryPlaceHome({ ...deliveryPlaceHome, [e.target.name]: e.target.value })} />
                        <input className="input" type="number" name="poste" placeholder="Code Postal" value={deliveryPlaceHome.poste} onChange={(e) => setDeliveryPlaceHome({ ...deliveryPlaceHome, [e.target.name]: e.target.value })} />
                        <input className="input" type="text" name="city" placeholder="Ville" value={deliveryPlaceHome.city} onChange={(e) => setDeliveryPlaceHome({ ...deliveryPlaceHome, [e.target.name]: e.target.value })} />
                    </div>
                </section>
                <section className="cart-delivery-choice">
                    <span className="card-title">Ou</span>
                </section>
                <section className="cart-delivery-station">
                    <h3 className="card-title">Livraison en station (Mairie)</h3>
                    <select name="station" id="station" className="input" onChange={(e) => setDeliveryPlaceStation(e.target.value)} value={deliveryPlaceStation}>
                        <option value=""> - Choisir une station - </option>
                        {deliveryPlacesStations.map((item, id) => (
                            <option value={item} key={id}>{item}</option>
                        ))}
                    </select>
                </section>
            </article>
            <Button type="btn-first" clickAction={() => setActiveTab("payement")}>Passer au paiement</Button>
        </>
    );
}

export default CartDelivery;