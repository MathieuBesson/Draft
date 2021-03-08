import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { FirebaseContext } from 'helpers/Firebase';
import MainMenu from 'components/MainMenu';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Card from 'components/Card';
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
            <MainMenu cartLenght={props.cartLenght} type={'gradient'} />
            {!!athlete &&
                <article className="athlete">
                    <Header backgroundUrl={athlete.mainImage}>
                        <h1 className="primary-title container">{athlete.firstName} {athlete.lastName}<span className="red-point">.</span></h1>
                    </Header>
                    <div className="athlete__block container">
                        <Card type="athlete__personal-infos">
                            <h3 className="third-title">Faits personnels<span className="red-point">.</span></h3>
                            <section>
                                <span className="card-subtitle">Date de naissance</span>
                                <p className="card-info">{athlete.birthday}</p>
                            </section>
                            <section>
                                <span className="card-subtitle">Nationnalité</span>
                                <p className="card-info">{athlete.nationality}</p>
                            </section>
                            <section>
                                <span className="card-subtitle">Discipline</span>
                                <p className="card-info">{athlete.discipline}</p>
                            </section>
                        </Card>
                        <iframe title="video-player" className="athlete__video" src={athlete.video} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                    </div>
                    <div className="athlete__block container">
                        <article className="athlete__biographie">
                            <h3 className="third-title">Biographie<span className="red-point">.</span></h3>
                            <p className="athlete__block-content">{athlete.biography}</p>
                        </article>
                        <Card type="athlete__palmares">
                            <h3 className="third-title">Palmarès<span className="red-point">.</span></h3>
                            {Object.keys(athlete.palmares).map((key, index) => (
                                <section key={index}>
                                    <span className="card-subtitle">{key}</span>
                                    <p className="card-info">{athlete.palmares[key]}</p>
                                </section>
                            ))}
                        </Card>
                    </div>
                </article>
            }
            <Footer />
        </>
    );
}

export default Athlete;