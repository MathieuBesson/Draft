import React, { useContext, useEffect, useState, Fragment } from 'react';
import { useHistory, Link } from "react-router-dom"
import UserSessionContext from '../UserSession'
import { FirebaseContext } from '../Firebase'
import Header from '../Header'
import Footer from '../Footer'

import './CartPage.scss'




const CartPage = (props) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);
    let history = useHistory();


    const deliveryPlaces = ["Chamonix-Mont-Blanc", "Val-d'Isère", "La Plagne", "L'Alpe D'Huez", "Les deux Alpes"];
    const [deliveryPlace, setDeliveryPlaces] = useState("Chamonix-Mont-Blanc");
    const [activeTab, setActiveTab] = useState('cart');

    useEffect(() => {
        if (user.userSession === null) {
            history.push({
                pathname: '/authentification',
                state: { errorMessage: 'Veuillez vous connecter pour accèder au panier' }
            })
        }
    }, [user, history]);

    const handleCommand = async (e) => {
        e.preventDefault();
        const userId = user.userData;
        userId.id = user.userSession.uid;
        props.deleteCart();

        await firebase.commands.set({
            userId: user.userData,
            command: props.cart,
            total: calcTotal(props.cart),
            date: Date.now(),
            place: deliveryPlace
        });
    }

    function calcTotal(arr) {
        return arr.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)
    }

    function DateToString(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString()
    }


    return (
        <>
            <Header background={{ backgroundColor: "#1B2B40" }} />
            <div className="cart">
                <article className="container">
                    {props.cart.length !== 0 ?
                        <article className="cart__not-empty">
                            <article className="card cart__infos-cart">
                                <div className="card__header">
                                    <h2 className={`third-title ${(activeTab !== 'cart') ? "card__title-disabled" : ""}`} onClick={() => setActiveTab("cart")}>1. Votre panier<span className="red-point">.</span></h2>
                                    <h2 className={`third-title ${(activeTab !== 'infos') ? "card__title-disabled" : ""}`} onClick={() => setActiveTab("infos")}>2. Vos informations<span className="red-point">.</span></h2>
                                    <h2 className={`third-title ${(activeTab !== 'payement') ? "card__title-disabled" : ""}`} onClick={() => setActiveTab("payement")} >3. Paiement<span className="red-point">.</span></h2>
                                </div>

                                <div className="card__body">
                                    {(activeTab === 'cart') && (
                                        <>
                                            {props.cart.map(product =>
                                                <section className="card__body-product">
                                                    <img className="card__body-img" src={product.mainImage} alt={product.name} />
                                                    <div>
                                                        <h3 className="card-title">Snowboard«{product.name}»</h3>
                                                        <p className="card-text">Taille {product.length}</p>
                                                        <span className="card__body-quantity" onClick={() => props.UpdateProductQuantity(product.id, (product.quantity - 1 === 0) ? 0 : product.quantity - 1)}>-</span>
                                                        <span> {product.quantity} </span>
                                                        <span className="card__body-quantity" onClick={() => props.UpdateProductQuantity(product.id, product.quantity + 1)}>+</span>
                                                        <span className="card__body-icon" onClick={() => props.deleteProduct(product.id)}>
                                                            <img className="card__body-icon" src={`${process.env.PUBLIC_URL}/bin.svg`} alt={product.name} />
                                                        </span>
                                                    </div>
                                                    <p className="card-title">{product.price * product.quantity}€</p>
                                                </section>
                                            )}
                                            <button className="btn-first" onClick={() => setActiveTab("infos")}>Vos informations</button>
                                        </>
                                    )}
                                    {(activeTab === 'infos') && (
                                        <>
                                            <article className="card__body-delivery">
                                                <section className="card__body-delivery-home">
                                                    <h3 className="card-title">Livraison à domicile</h3>
                                                    <div className="card__body-delivery-home-group">
                                                        <input className="input" type="text" placeholder="Adresse" />
                                                        <input className="input" type="number" placeholder="Code Postal" />
                                                        <input className="input" type="text" placeholder="Ville" />
                                                    </div>
                                                </section>
                                                <section className="card__body-station-delivery">
                                                    <h3 className="card-title">Livraison en station</h3>
                                                    <select name="station" id="station" className="input">
                                                        <option value=""> - Choisir une station - </option>
                                                        {deliveryPlaces.map((item) => (
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </section>
                                            </article>
                                            <button className="btn-first" onClick={() => setActiveTab("payement")}>Passer au paiement</button>
                                        </>
                                    )}
                                    {(activeTab === 'payement') && (
                                        <>
                                            <article className="card__body-payement">
                                                <h3 className="card-title">informations de paiement</h3>
                                                <div className="card__body-payement-group">
                                                    <div className="card__body-payement-group-inputs">
                                                        <input className="input" type="text" placeholder="Titutaire de la carte" />
                                                        <input className="input" type="number" placeholder="0000 0000 0000 0000" />
                                                        <div className="card__body-payement-group-list">
                                                            <input className="input" type="text" placeholder="Date de validité (00/00)" />
                                                            <input className="input" type="text" placeholder="CVC" />
                                                        </div>
                                                    </div>
                                                    <div className="card__body-payement-bank-card" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/bank-card.svg')` }}></div>
                                                </div>
                                            </article>
                                            <button className="btn-first" onClick={() => setActiveTab("payement")} onClick={handleCommand}>Payer</button>
                                        </>
                                    )}
                                    {/* {props.cart.map(product =>
                                    <div className="card" style={{ width: "18rem" }} key={product.id}>
                                        {console.log(product)}
                                        <img className="card-img-top" src={product.mainImage} alt={product.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">Nom : {product.name}</h5>
                                            <p className="card-text">Prix : {product.price} €</p>
                                            <p className="card-text">Taille {product.length}</p>
                                            <button className="btn btn-primary" onClick={() => props.UpdateProductQuantity(product.id, (product.quantity - 1 === 0) ? 0 : product.quantity - 1)}>-</button>
                                            <span> {product.quantity} </span>
                                            <button className="btn btn-primary" onClick={() => props.UpdateProductQuantity(product.id, product.quantity + 1)}>+</button>
                                            <button className="btn btn-primary" onClick={() => props.deleteProduct(product.id)}>Delete</button>
                                        </div>
                                    </div>)} */}
                                    {/* <span>Livraison dans l'office du toursime de : </span>
                                <form>
                                    <select name="delivery-place" id="delivery-place" onChange={(e) => setDeliveryPlaces(e.target.value)} value={deliveryPlace}>
                                        {deliveryPlaces.map((place, id) => (
                                            <option value={place} key={id}>{place}</option>
                                        ))}
                                    </select>
                                    <p>Livraison prévue pour le {DateToString(Date.now() + 1000 * 60 * 60 * 24 * 5)}</p>
                                    <p>Total : {calcTotal(props.cart)} €</p>
                                    <input className="btn btn-primary mt-5" type="submit" onClick={handleCommand} value="Valider ma commande" />
                                </form> */}
                                </div>
                            </article>
                            <div className="cart__recap">
                                <article className="card">
                                    <h2 className="third-title">Recapitulatif<span className="red-point">.</span></h2>
                                    <div className="cart__recap-group">
                                        <span className="card-content">Sous-total</span>
                                        <span className="card-content">{calcTotal(props.cart)}€</span>
                                    </div>
                                    <div className="cart__recap-group">
                                        <span className="card-content">Livraison</span>
                                        <span className="card-content">Gratuite</span>
                                    </div>
                                    <hr />
                                    <div className="cart__recap-group">
                                        <span className="card-title">Total</span>
                                        <span className="card-title">{calcTotal(props.cart)}€</span>
                                    </div>
                                </article>
                                <ul className="cart__recap-list">
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
                        </article>
                        :
                        <article className="cart__empty">
                            <h2 className="third-title">Votre panier est vide...</h2>
                            <p className="cart__empty-content">Il semblerait que votre panier soit vide, nous vous invitons à découvrir nos produits et à revenir plus tard !</p>
                            <Link className="btn-first" to="/shop">Découvrir nos produits</Link>
                        </article>
                    }
                </article>
            </div>
            <Footer type="normal" />
        </>
    );
}

export default CartPage;