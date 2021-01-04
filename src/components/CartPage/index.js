import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import UserSessionContext from '../UserSession'
import { FirebaseContext } from '../Firebase'



const CartPage = (props) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);
    let history = useHistory();
    const deliveryPlaces = ["Chamonix-Mont-Blanc", "Val-d'Isère", "La Plagne", "L'Alpe D'Huez", "Les deux Alpes"];
    const [deliveryPlace, setDeliveryPlaces] = useState("Chamonix-Mont-Blanc");

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

    function calcTotal(arr){
        return arr.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)
    }

    function DateToString(timestamp){
        let date = new Date(timestamp);
        return date.toLocaleString()
    }


    return (
        <div>
            {props.cart.length !== 0 ?
                <div>
                    {props.cart.map(product =>
                        <div className="card" style={{ width: "18rem" }} key={product.id}>
                            <img className="card-img-top" src={product.image} alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">Nom : {product.name}</h5>
                                <p className="card-text">Prix : {product.price} €</p>
                                <button className="btn btn-primary" onClick={() => props.UpdateProductQuantity(product.id, (product.quantity -1 === 0) ? 0 : product.quantity -1)}>-</button>
                                <span> {product.quantity} </span>
                                <button className="btn btn-primary" onClick={() => props.UpdateProductQuantity(product.id, product.quantity +1)}>+</button>
                                <button className="btn btn-primary" onClick={() => props.deleteProduct(product.id)}>Delete</button>
                            </div>
                        </div>)}
                    <span>Livraison dans l'office du toursime de : </span>
                    <form>
                        <select name="delivery-place" id="delivery-place" onChange={(e) => setDeliveryPlaces(e.target.value)} value={deliveryPlace}>
                            {deliveryPlaces.map((place, id) => (
                                <option value={place} key={id}>{place}</option>
                            ))}
                        </select>
                        <p>Livraison prévue pour le {DateToString(Date.now() + 1000*60*60*24*5)}</p>
                        <p>Total : {calcTotal(props.cart)} €</p>
                        <input className="btn btn-primary mt-5" type="submit" onClick={handleCommand} value="Valider ma commande" />
                    </form>
                </div>
                : <p>Pas de produits dans votre panier</p>
            }
        </div>
    );
}

export default CartPage;