import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Product = (props) => {

    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    let { slug } = useParams();
    const firebase = useContext(FirebaseContext);

    const fetchProduct = async () => {
        firebase.db.collection("snow").where("slug", "==", slug).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setProduct(doc.data());
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }


    useEffect(() => {
        fetchProduct();
    }, []);


    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();

        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        return str;
    }





    return (
        <div>
            {!!product &&
                <div className="card" style={{width: "18rem"}}>
                    <img className="card-img-top" src={product.image} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.content}</p>
                            <button className="btn btn-primary" onClick={() => setQuantity((quantity -1 < 0) ? 0 : quantity -1)}>-</button><span> {quantity} </span><button className="btn btn-primary" onClick={() => setQuantity(quantity +1)}>+</button>
                            <a href="#" className="btn btn-primary mt-3" onClick={() => props.handleCart({...product, quantity})}>Ajouter à mon backpack !</a>
                        </div>
                </div>}
        </div>
    );
}

export default Product;