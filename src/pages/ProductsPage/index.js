import React, { useEffect, useContext, useState, useCallback, Fragment, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from 'helpers/Firebase'
import Button from 'components/Button';
import Header from 'components/Header';
import './Products.scss'
import Footer from 'components/Footer'
import MainMenu from 'components/MainMenu'


const ProductsPage = (props) => {

    const firebase = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);
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
        designBoard.current.style.setProperty('--background', `url(${firstProduct.mainImage})`)

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
        designBoard.current.style.setProperty('--background', `url(${product.mainImage})`)
    }

    const addToCart = (product) => {
        history.push("/panier");
        return props.UpdateCart({ ...product, quantity: 1, length: "152cm" }, product.id)
    }


    return (
        <>
            <MainMenu cartLenght={props.cartLenght} type={'gradient'} />
            <div className="products" >
                <Header type="products__header" backgroundUrl={process.env.PUBLIC_URL + '/header-bg-shop.png'}>
                    <h1 className="primary-title">Nouvelle Collection</h1>
                    <div className="vertical-hr"></div>
                    <img src={`${process.env.PUBLIC_URL}/logo-monde-lumineux.png`} alt="Logo le monde lumineux"/>
                </Header>
                <div className="products__part">
                    <div className="container">
                        <div className="products__list">
                            {products.map((product) => {
                                return (
                                    <section key={product.id} className={"card products__item " + (!!currentProduct && product.id === currentProduct.id ? "zoom" : '')} onClick={() => { handleClick(product) }}>
                                        <img src={product.mainImage} alt={product.name} />
                                        <article className="products__item-details">
                                            <h3 className="third-title">{product.name}<span className="red-point">.</span></h3>
                                            <div className="products__item-details-group">
                                                <Link to={`/produits/${slugify(product.name)}`}><Button type="btn-first">Détails</Button></Link>
                                                <p className="products__item-details-price">{product.price}€</p>
                                            </div>
                                        </article>
                                    </section>
                                );
                            })}
                        </div>
                        {!!currentProduct &&
                            <div ref={designBoard} className="products__current-product" >
                                <h3 className="products__currrent-name">{currentProduct.name}<span className="red-point">.</span></h3>
                                <p className="products__currrent-content">{currentProduct.content}</p>
                                <h3 className="products__currrent-price">{currentProduct.price}€</h3>
                                <div className="products__group-button">
                                    <Link to={`/produits/${slugify(currentProduct.name)}`}><Button type="btn-first">Voir en détail</Button></Link>
                                    <Button type="btn-second" clickAction={() => addToCart(currentProduct)}>Achat rapide</Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductsPage;