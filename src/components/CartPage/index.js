import React, { useContext, useEffect } from 'react';
import UserSessionContext from '../UserSession'

const CartPage = (props) => {

    const user = useContext(UserSessionContext);


    useEffect(() => {
        if (user.userSession === null) {
            props.history.push({
                pathname: '/authentification',
                state: { errorMessage: 'Veuillez vous connecter pour accèder au panier' }
            })
        }
    }, [user, props.history]);

    return (
        <div>
            {props.cart.map(product =>
                <div className="card" style={{ width: "18rem" }} key={product.id}>
                    <img className="card-img-top" src={product.image} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.content}</p>
                        {/* <button className="btn btn-primary" onClick={() => setQuantity((product.quantity - 1 < 0) ? 0 : product.quantity - 1)}>-</button><span> {product.quantity} </span><button className="btn btn-primary" onClick={() => setQuantity(product.quantity + 1)}>+</button> */}
                    </div>
                </div>)}
        </div>
    );
}

export default CartPage;