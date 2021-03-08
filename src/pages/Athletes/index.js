import React, { useEffect, useContext, useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import { FirebaseContext } from 'helpers/Firebase'
import MainMenu from 'components/MainMenu'
import Footer from 'components/Footer'
import Button from 'components/Button'
import Header from 'components/Header'
import Card from 'components/Card'


import './Athletes.scss'

const Athletes = (props) => {

    const firebase = useContext(FirebaseContext);
    const [athletes, setAthletes] = useState([]);

    const fetchProducts = useCallback(async () => {
        const productsCollection = await firebase.athletes.get();
        setAthletes(
            productsCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
    }, [firebase]);

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
            <MainMenu cartLenght={props.cartLenght} type={'gradient'} />
            <article className="athletes-page">
                <Header type="athletes-page__header" backgroundUrl={process.env.PUBLIC_URL +'/header-bg-shop.png'}>
                    <h1 className="primary-title">Nos Athlètes<span className="red-point">.</span></h1>
                </Header>
                <article className="athletes-page__body container">
                {athletes.map(athlete => (
                    <Card key={athlete.id} keyCard={athlete.id} type="athletes-page__item black-card card" style={{ backgroundImage: `url('${athlete.cutOutImage}')` }}>
                        <h3 className="third-title athletes-page__item-title ">{`${athlete.firstName} ${athlete.lastName}`}</h3>
                        <p className="card-content">{athlete.shortDescription}</p>
                        <Link to={`/athletes/${slugify(`${athlete.firstName} ${athlete.lastName}`)}`}><Button type="btn-first">Voir en détail</Button></Link>
                    </Card>
                ))}
                </article>
                <article className="approach__body container">
                    <h2 className="secondary-title">Notre démarche<span className="red-point">.</span></h2>
                    <p className="approach__body-content">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                    </p>
                </article>
                <Footer/>
            </article>
        </>
    );
}

export default Athletes;