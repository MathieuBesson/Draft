import React, { useEffect, useContext, useState, useCallback, Fragment, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from '../Firebase'
import './Products.scss'
import Footer from '../Footer'
import Header from '../Header'


const ProductsPage = (props) => {

    const firebase = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);
    // const [currentProductId, setCurrentProductId] = useState(0);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [boardDeco, setBoardDeco] = useState();
    const designBoard = useRef(null);
    let history = useHistory()


    const fetchProducts = useCallback(async () => {
        const productsCollection = await firebase.products.get();
        setProducts(
            productsCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
        const firstProduct = productsCollection.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0]
        setCurrentProduct(firstProduct)
        designBoard.current.style.setProperty('--background', `url(${firstProduct.image})`)

    }, [firebase.products]);

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

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleClick = (product) => {
        setCurrentProduct(product)
        designBoard.current.style.setProperty('--background', `url(${product.image})`)
    }

    const addToCart = (product) => {
        history.push("/panier"); 
        // console.log(props)
        return props.UpdateCart({...product, quantity: 1}, product.id)
    }


    return (
        <>
            <Header />
            <div className="products" >
                {console.log(boardDeco)}
                {/* {boardDeco} */}
                <div className="products__header" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/header-bg-shop.png')` }}>
                    <img src={`${process.env.PUBLIC_URL}/logo-monde-lumineux.png`} />
                </div>
                <div className="products__part">
                    <div className="container">
                        <div className="products__list">
                            {products.map((product) => {
                                return (
                                    <li key={product.id} className={"products__item " + (!!currentProduct && product.id === currentProduct.id ? "zoom" : '')} onClick={() => { handleClick(product) }}>
                                        <img src={product.image} alt={product.name} />
                                    </li>
                                );
                            })}
                        </div>
                        {console.log(currentProduct)}
                        {!!currentProduct &&
                            <div ref={designBoard} className="products__current-product" >
                                <h3 className="products__currrent-name">{currentProduct.name}<span className="red-point">.</span></h3>
                                <p className="products__currrent-content">{currentProduct.content}</p>
                                <h3 className="products__currrent-price">{currentProduct.price}€</h3>
                                <div className="products__group-button">
                                    <Link className="btn-first" to={`/produits/${slugify(currentProduct.name)}`}>Voir en détail</Link>
                                    {/* <Link className="btn-second" to={`/produits/${slugify(currentProduct.name)}`}>Achat rapide</Link> */}
                                    <button className="btn-second" onClick={() => addToCart(currentProduct)}>Achat rapide</button>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer type="normal" />
        </>
    );
}

export default ProductsPage;