import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FirebaseContext } from '../Firebase'
import Header from '../Header'
import Footer from '../Footer'
import './CollaborationsPage.scss'

const CollaborationsPage = (props) => {

    const firebase = useContext(FirebaseContext);
    const [athletes, setAthletes] = useState([]);

    const fetchProducts = useCallback(async () => {
        const productsCollection = await firebase.athletes.get();
        setAthletes(
            productsCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
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

    return (
        <>
            <Header cartLenght={props.cartLenght} background={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)" }} />
            <article className="athletes-page">
                <div className="athletes-page__header" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/header-bg-shop.png')` }}>
                    <h1 className="primary-title">Nos Athlètes<span className="red-point">.</span></h1>
                </div>
                <article className="athletes-page__body container">
                {athletes.map(athlete => (
                    <section key={athlete.id} className="athletes-page__item black-card" style={{ backgroundImage: `url('${athlete.cutOutImage}')` }}>
                        <h3 className="black-card-title third-title">{`${athlete.firstName} ${athlete.lastName}`}</h3>
                        <p className="black-card-content">{athlete.shortDescription}</p>
                        <Link to={`/athletes/${slugify(`${athlete.firstName} ${athlete.lastName}`)}`} className="btn-first">Voir en détail</Link>
                    </section>
                ))}
                </article>
                <article className="approach__body container">
                    <h2 className="secondary-title">Notre démarche<span className="red-point">.</span></h2>
                    <p className="approach__body-content">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    </p>
                </article>
                <Footer type="normal"/>
            </article>
        </>
    );
}

export default CollaborationsPage;