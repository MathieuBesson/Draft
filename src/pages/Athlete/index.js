import React, { useEffect, useState, useContext, useCallback, } from 'react';
import { useParams } from 'react-router-dom'
import { FirebaseContext } from 'helpers/Firebase'
import Header from 'components/Header'
import Footer from 'components/Footer'

import './Athlete.scss'

const Athlete = (props) => {

    const [athlete, setAthlete] = useState(null)

    let { slug } = useParams();
    const firebase = useContext(FirebaseContext);

    const fetchProduct = useCallback(async () => {
        firebase.db.collection("athletes").where("slug", "==", slug).get()
            .then((querySnapshot) => {
                setAthlete(
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

    return (
        <>
            <Header cartLenght={props.cartLenght} background={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)" }} />
            {!!athlete &&
                <article className="athlete">
                    <header className="athlete__header" style={{ backgroundImage: `url('${athlete.mainImage}')` }}>
                        <h1 className="primary-title container">{athlete.firstName} {athlete.lastName}<span className="red-point">.</span></h1>
                    </header>
                    <div className="athlete__block container">
                        <article className="card athlete__personal-infos">
                            <h3 className="third-title">Faits personnels<span className="red-point">.</span></h3>
                            <div>
                                <span className="athlete__block-subtitle">Date de naissance</span>
                                <p className="athlete__block-info">{athlete.birthday}</p>
                            </div>
                            <div>
                                <span className="athlete__block-subtitle">Nationnalité</span>
                                <p className="athlete__block-info">{athlete.nationality}</p>
                            </div>
                            <div>
                                <span className="athlete__block-subtitle">Discipline</span>
                                <p className="athlete__block-info">{athlete.discipline}</p>
                            </div>
                        </article>
                        <iframe className="athlete__video" src={athlete.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className="athlete__block container">
                        <article className="athlete__biographie">
                            <h3 className="third-title">Biographie<span className="red-point">.</span></h3>
                            <p className="athlete__block-content">{athlete.biography}</p>
                        </article>
                        <article className="card athlete__palmares">
                            <h3 className="third-title">Palmarès<span className="red-point">.</span></h3>
                            {console.log(athlete.palmares)}
                            {Object.keys(athlete.palmares).map((key, index) => (
                                <div key={index}>
                                    <span className="athlete__block-subtitle">{key}</span>
                                    <p className="athlete__block-info">{athlete.palmares[key]}</p>
                                </div>
                            ))}
                        </article>
                    </div>
                </article>
            }
            <Footer />
        </>
    );
}

export default Athlete;