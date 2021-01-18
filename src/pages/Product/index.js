import React, { useEffect, useState, useContext, useCallback, } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { FirebaseContext } from 'helpers/Firebase'
import './Product.scss'
import MainMenu from 'components/MainMenu'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Card from 'components/Card'
import Carrousel from 'components/Carrousel'

const Product = (props) => {

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [length, setLength] = useState("152CM");
    const [currentImg, setCurrentImg] = useState();

    const sizes = [152, 153, 156, 158];
    const advantages = [
        {
            title: "Polyvalence",
            content: "33% piste, 33% hors-piste, 34% Park. Une planche qui conviendra à tous."
        },
        {
            title: "Rigidité",
            content: "Flex 6/10. Très bon pop pour les sauts à bonne vitesse. "
        },
        {
            title: "Tolérance",
            content: "Torsion médium qui rend la planche facile et joueuse."
        },
        {
            title: "Adaptabilité morphologique",
            content: "152cm : 1.67 - 1.77m  /  153cm : 1.68 - 1.78m  156cm : 1.71 - 1.81m  /  158cm : 1.78 - 1.90m"
        },
        {
            title: "Qualité de glisse",
            content: "Semelle en PEHD frittée pour une excellente qualité de glisse."
        },
        {
            title: "Maniabilité",
            content: "Torsion moyenne : accroche et facilité. Joueuse grâce à sa petite taille. "
        }
    ];
    const detailsList = [
        "Semelle fritée",
        "Noyau bois en Peuplier 20mm",
        "Nombre d’inserts : 10 + 10 et 4 polder inserts",
        "Twintip + 20mm de Setback",
        "Largeur avant : 300mm, centre : 258mm, arrière : 300mm",
        "Rayon : 8,3m",
        "Stance recommandé : 565mm"
    ]

    let history = useHistory()

    let { slug } = useParams();
    const firebase = useContext(FirebaseContext);

    const fetchProduct = useCallback(async () => {
        firebase.db.collection("snows").where("slug", "==", slug).get()
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


    return (
        <>
            <MainMenu cartLenght={props.cartLenght} type={'plain'} />
            <article className="product" id="product">
                <div className="container">
                    {!!product &&
                        <section className="product__main">
                            <Carrousel files={product.files} setCurrentImg={setCurrentImg} currentImg={currentImg}/>
                            <Card>
                                <h3 className="third-title">{product.name}<span className="red-point">.</span></h3>
                                <p className="card-content">{product.content}</p>
                                <div className="product__radio">
                                    <h4 className="card-title">Choix de la taille</h4>
                                    {sizes.map(size => (
                                        <>
                                            <input id={size + 'CM'} value={size + 'CM'} name="platform" type="radio" onChange={(e) => setLength(e.target.value)} checked={length === (size + 'CM')} />
                                            <label htmlFor={size + 'CM'}>{size + 'CM'}</label>
                                        </>
                                    ))}
                                </div>
                                <article className="product__card-bottom">
                                    <div className="product__quantity">
                                        <h4 className="card-title">Quantité</h4>
                                        <span className="product__quantity-change" onClick={() => setQuantity((quantity - 1 < 0) ? 0 : quantity - 1)}>-</span>
                                        <span> {quantity} </span>
                                        <span className="product__quantity-change" onClick={() => setQuantity(quantity + 1)}>+</span>
                                        <br />
                                    </div>
                                    <p className="product__price">Prix : {product.price * quantity}€</p>
                                </article>
                                <Button type="btn-first" clickAction={() => addToCart(product)}>Ajouter au panier</Button>
                            </Card>
                        </section>}
                    <section className="product__advantage">
                        <h2 className="secondary-title">Les avantages du produit<span className="red-point">.</span></h2>
                        <div className="product__advantage-list">
                            {advantages.map((item, index) => (
                                <section className="product__advantage-item">
                                    <img src={process.env.PUBLIC_URL + '/icons/advantages-icon-' + index + '.svg'}></img>
                                    <div className="product__advantage-infos">
                                        <h3 className="third-title">{item.title}</h3>
                                        <p className="product__advantage-content">{item.content}</p>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </section>
                    <section className="product__details">
                        <h2 className="secondary-title">Détails et caractéristiques<span className="red-point">.</span></h2>
                        <p className="product__content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                        <div className="product__details-group">
                            <ul className="product__details-list">
                                {detailsList.slice(0, Math.ceil(detailsList.length / 2)).map(item => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                            <ul className="product__details-list">
                                {detailsList.slice(Math.ceil(detailsList.length / 2)).map(item => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </article>
            <Footer />
        </>
    );
}

export default Product;