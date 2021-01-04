import React, { useEffect, useState, useContext, useCallback, } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Product = (props) => {

    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    let history = useHistory()

    let { slug } = useParams();
    const firebase = useContext(FirebaseContext);

    const fetchProduct = useCallback(async () => {
        firebase.db.collection("snow").where("slug", "==", slug).get()
            .then((querySnapshot) => {
                setProduct(
                    ...querySnapshot.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                );
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }, [slug, firebase.db]);


    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const addToCart = () => {
        history.push("/panier"); 
        return props.UpdateCart({...product, quantity}, product.id)
    }

    return (
        <div>
            {!!product &&
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={product.image} alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.content}</p>
                            <button className="btn btn-primary" onClick={() => setQuantity((quantity -1 < 0) ? 0 : quantity -1)}>-</button><span> {quantity} </span><button className="btn btn-primary" onClick={() => setQuantity(quantity +1)}>+</button>
                            <button className="btn btn-primary mt-3" onClick={() => addToCart(product)}>Ajouter à mon backpack !</button>
                        </div>
                </div>}
        </div>
    );
}

export default Product;