import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import UserSessionContext from 'helpers/UserSession'
import { FirebaseContext } from 'helpers/Firebase'
import MainMenu from 'components/MainMenu'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Card from 'components/Card'
import PaiementGroup from 'components/PaiementGroup'
import OrderSummary from 'components/OrderSummary'
import EmptyCart from 'components/EmptyCart'
import CartProducts from 'components/CartProducts'
import CartDelivery from 'components/CartDelivery'
import CartHeader from 'components/CartHeader'
import './Cart.scss'

const Cart = ({ deleteCart, cart, isConnected, updateProductQuantity, deleteProduct, cartLenght }) => {

    const user = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);
    let history = useHistory();
    const deliveryPlaceHomeDefault = { adresse: "", poste: "", city: "" };


    const [deliveryPlaceStation, setDeliveryPlaceStation] = useState("");
    const [deliveryPlaceHome, setDeliveryPlaceHome] = useState(deliveryPlaceHomeDefault);
    const [activeTab, setActiveTab] = useState('cart');
    const [cardBank, setCardBank] = useState({
        number: "**** **** **** ****",
        owner: "Jean Dupond",
        validDate: "00 / 00",
        CVC: "000"
    });
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log(isConnected)
        if (!isConnected) {
            history.push({
                pathname: '/authentification',
                state: { errorMessage: 'Veuillez vous connecter pour accèder au panier' }
            })
        }
    }, [isConnected, history]);

    const handleCommand = async (e) => {
        e.preventDefault();
        setErrorMessage(null)
        const noDeliveryPlace = deliveryPlaceStation === "" && JSON.stringify(deliveryPlaceHome) === JSON.stringify(deliveryPlaceHomeDefault);
        const twoDeliveryPlace = deliveryPlaceStation !== "" && JSON.stringify(deliveryPlaceHome) !== JSON.stringify(deliveryPlaceHomeDefault);
        const deliveryPlaceHomeNoComplete = deliveryPlaceHome.adresse === "" || deliveryPlaceHome.poste === "" || deliveryPlaceHome.city === ""
        if (noDeliveryPlace || twoDeliveryPlace) {
            setErrorMessage("Choisissez entre la livraison à domicile en station en vidant les champs non concernés")
            return
        }
        if (deliveryPlaceHomeNoComplete && deliveryPlaceStation === "") {
            setErrorMessage("Les champs adresse, code postal et ville doivent être complété")
            return
        }
        const userId = user.userData;
        userId.id = user.userSession.uid;
        deleteCart();

        await firebase.commands.set({
            userId: user.userData,
            command: cart,
            total: calcTotal(cart),
            date: Date.now(),
            place: !deliveryPlaceStation ? Object.keys(deliveryPlaceHome).map((key) => deliveryPlaceHome[key] + " ") : deliveryPlaceStation
        });
        // history.push("/");
    }

    function calcTotal(arr) {
        return arr.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0)
    }

    return (
        <>
            <MainMenu cartLenght={cartLenght} type={'plain'} />
            <div className="cart">
                <article className="container">
                    {cart.length !== 0 ?
                        <article className="cart__not-empty">
                            <Card type="cart__infos-cart">
                                <CartHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                                {!!errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                <div className="card__body">
                                    {(activeTab === 'cart') && (
                                        <CartProducts
                                            cart={cart}
                                            updateProductQuantity={updateProductQuantity}
                                            deleteProduct={deleteProduct}
                                            setActiveTab={(item) => setActiveTab(item)}
                                        />
                                    )}
                                    {(activeTab === 'infos') && (
                                        <CartDelivery
                                            deliveryPlaceHome={deliveryPlaceHome}
                                            setDeliveryPlaceHome={setDeliveryPlaceHome}
                                            deliveryPlaceStation={deliveryPlaceStation}
                                            setDeliveryPlaceStation={setDeliveryPlaceStation}
                                            setActiveTab={(item) => setActiveTab(item)}
                                        />
                                    )}
                                    {(activeTab === 'payement') && (
                                        <PaiementGroup
                                            cardBank={cardBank}
                                            handleCardBank={(value) => setCardBank(value)}
                                            handleCommand={handleCommand}
                                        />
                                    )}
                                </div>
                            </Card>
                            <OrderSummary total={calcTotal(cart)} deliveryPlaceStation={deliveryPlaceStation} deliveryPlaceHome={deliveryPlaceHome} />
                        </article>
                        :
                        <EmptyCart />
                    }
                </article>
            </div>
            <Footer />
        </>
    );
}

export default Cart;