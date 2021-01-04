import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FirebaseContext } from '../Firebase'

const ProductsPage = (props) => {

    const firebase = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        const productsCollection = await firebase.products.get();
        setProducts(
            productsCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
    }, [firebase.products]);

    function slugify (str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
      
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    
        return str;
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <ul>
            {products.map((product) => {
                return (
                    <li key={product.id} className="mb-5">
                        <img width="100" height="100" src={product.image} alt={product.name} />
                        <p>{product.name}</p>
                        <p>{product.price} €</p>
                        <Link className="btn btn-primary" to={`/produits/${slugify(product.name)}`}>Voir la planche</Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default ProductsPage;