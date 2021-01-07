import React, { useEffect, useState, useContext, useCallback, } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'
import './Product.scss'
import Header from '../Header'
import Footer from '../Footer'


const Product = (props) => {

    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [length, setLength] = useState("152CM")
    const [currentImg, setCurrentImg] = useState()



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
                setCurrentImg(...querySnapshot.docs.map((doc) => (doc.data().files.mainFile)))
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
        return props.UpdateCart({ ...product, quantity, length }, product.id)
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setLength(value);
    };


    return (
        <>
            <Header background={{ backgroundColor: "#1B2B40" }} />
            <article className="product" id="product">
                <div className="container">
                    {!!product &&
                        <section className="product__main">
                            {console.log(product.files)}
                            <article className="product__images">
                                <div className="product__group-miniature">
                                    <div className="product__miniature" style={{ backgroundImage: `url('${product.files.mainFile}')` }} onClick={() => setCurrentImg(product.files.mainFile)} alt="Main file"></div>
                                    <div className="product__miniature" style={{ backgroundImage: `url('${product.files.secondFile}')` }} onClick={() => setCurrentImg(product.files.secondFile)} alt="Second file"></div>
                                    <div className="product__miniature" style={{ backgroundImage: `url('${product.files.thirdFile}')` }} onClick={() => setCurrentImg(product.files.thirdFile)} alt="Third file"></div>
                                </div>
                                <div className="product__current" alt="Current file">
                                    <div className={"product__current-img " + (currentImg === product.files.mainFile ? "rotate" : '')} style={{ backgroundImage: `url('${currentImg}')` }}></div>
                                </div>
                            </article>
                            <div className="card">
                                <h3 className="third-title">{product.name}<span className="red-point">.</span></h3>
                                <p className="card-content">{product.content}</p>
                                <div className="product__radio">
                                    <h4 className="card-title">Choix de la taille</h4>
                                    <input id="152CM" value="152CM" name="platform" type="radio" onChange={handleChange} checked={length === "152CM"} />
                                    <label htmlFor="152CM">152CM</label>
                                    <input id="153CM" value="153CM" name="platform" type="radio" onChange={handleChange} checked={length === "153CM"} />
                                    <label htmlFor="153CM">153CM</label>
                                    <input id="156CM" value="156CM" name="platform" type="radio" onChange={handleChange} checked={length === "156CM"} />
                                    <label htmlFor="156CM">156CM</label>
                                    <input id="158CM" value="158CM" name="platform" type="radio" onChange={handleChange} checked={length === "158CM"} />
                                    <label htmlFor="158CM">158CM</label>
                                </div>
                                <div className="product__card-bottom">
                                    <div className="product__quantity">
                                        <h4 className="card-title">Quantité</h4>
                                        <span className="product__quantity-change" onClick={() => setQuantity((quantity - 1 < 0) ? 0 : quantity - 1)}>-</span><span> {quantity} </span><span className="product__quantity-change" onClick={() => setQuantity(quantity + 1)}>+</span>
                                        <br />
                                    </div>
                                    <p className="product__price">Prix : {product.price * quantity}€</p>
                                </div>
                                <button className="btn-first product__btn" onClick={() => addToCart(product)}>Ajouter au panier <img src={process.env.PUBLIC_URL + '/cart.svg'} /></button>
                            </div>
                        </section>}
                    <section className="product__advantage">
                        <h2 className="secondary-title">Les avantages du produit<span className="red-point">.</span></h2>
                        <div className="product__advantage-list">
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-1.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Polyvalence</h3>
                                    <p className="product__advantage-content">33% piste, 33% hors-piste, 34% Park. Une planche qui conviendra à tous.  </p>
                                </div>
                            </section>
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-2.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Rigidité</h3>
                                    <p className="product__advantage-content">Flex 6/10. Très bon pop pour les sauts à bonne vitesse. </p>
                                </div>
                            </section>
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-3.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Tolérance</h3>
                                    <p className="product__advantage-content">Torsion médium qui rend la planche facile et joueuse. </p>
                                </div>
                            </section>
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-4.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Adaptabilité morphologique</h3>
                                    <p className="product__advantage-content">152cm : 1.67 - 1.77m  /  153cm : 1.68 - 1.78m  156cm : 1.71 - 1.81m  /  158cm : 1.78 - 1.90m </p>
                                </div>
                            </section>
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-5.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Qualité de glisse</h3>
                                    <p className="product__advantage-content">Semelle en PEHD frittée pour une excellente qualité de glisse. </p>
                                </div>
                            </section>
                            <section className="product__advantage-item">
                                <img src={process.env.PUBLIC_URL + '/advantages-icon-6.svg'}></img>
                                <div className="product__advantage-infos">
                                    <h3 className="third-title">Maniabilité</h3>
                                    <p className="product__advantage-content">Torsion moyenne : accroche et facilité. Joueuse grâce à sa petite taille. </p>
                                </div>
                            </section>
                        </div>
                    </section>
                    <section className="product__details">
                        <h2 className="secondary-title">Détails et caractéristiques<span className="red-point">.</span></h2>
                        <p className="product__content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                        <div className="product__details-group">
                            <ul className="product__details-list">
                                <li>Semelle fritée</li>
                                <li>Noyau bois en Peuplier 20mm</li>
                                <li>Nombre d’inserts : 10 + 10 et 4 polder inserts</li>
                                <li>Twintip + 20mm de Setback</li>
                            </ul>
                            <ul className="product__details-list">
                                <li>Taille : 153cm</li>
                                <li>Largeur avant : 300mm, centre : 258mm, arrière : 300mm</li>
                                <li>Rayon : 8,3m</li>
                                <li>Stance recommandé : 565mm</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </article>
            <Footer type="normal" />
        </>
    );
}

export default Product;