import React from 'react';
import Button  from 'components/Button';
import './CartProducts.scss'

const CartProducts = ({ cart, updateProductQuantity, deleteProduct, setActiveTab }) => {
    return (
        <>
            {cart.map(product =>
                <section className="cart-product" key={product.id}>
                    <img className="cart-product-img" src={product.mainImage} alt={product.name} />
                    <div>
                        <h3 className="card-title">Snowboard «{product.name}»</h3>
                        <p className="card-text">Taille {product.length}</p>
                        <span className="cart-product-quantity" onClick={() => updateProductQuantity(product.id, (product.quantity - 1 === 0) ? 0 : product.quantity - 1)}>-</span>
                        <span> {product.quantity} </span>
                        <span className="cart-product-quantity" onClick={() => updateProductQuantity(product.id, product.quantity + 1)}>+</span>
                        <span className="cart-product-icon" onClick={() => deleteProduct(product.id)}>
                            <img className="cart-product-icon" src={`${process.env.PUBLIC_URL}/icons/bin-icon.svg`} alt={product.name} />
                        </span>
                    </div>
                    <p className="card-title">{product.price * product.quantity}€</p>
                </section>
            )}
            <Button type="btn-first" clickAction={() => setActiveTab("infos")}>Vos informations</Button>
        </>
    );
}

export default CartProducts;