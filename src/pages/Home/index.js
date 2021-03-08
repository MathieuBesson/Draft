import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFullpage from "@fullpage/react-fullpage";
import './Home.scss'
import Footer from 'components/Footer';
import MainMenu from 'components/MainMenu';
import Button from 'components/Button';
import Header from 'components/Header';




const Home = (props) => {

    const [currentTab, setCurrentTab] = useState(0)

    const specificities = [
        {
            title: "Les talons",
            content: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
        },
        {
            title: "Différentes tailles",
            content: "Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum."
        },
        {
            title: "Les spatules",
            content: "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
        }
    ]


    return (
        <>
            <MainMenu cartLenght={props.cartLenght} type={'gradient'} />
            <ReactFullpage
                scrollOverflow={true}
                navigation={true}
                render={() => {
                    return (
                        <div id="fullpage-wrapper">
                            <Header type="section presentation" backgroundUrl={process.env.PUBLIC_URL + '/banner-home.svg'}>
                                <h1 className="primary-title container">Enjoy The Vibes<span className="red-point">.</span></h1>
                                <p className="presentation__content primary-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</p>
                                <Link to='/shop'><Button type="btn-first">Voir notre nouvelle collection</Button></Link>
                            </Header>
                            <div className="section quality-board">
                                <div className="container">
                                    <article className="quality-board__block">
                                        <h2 className="secondary-title">Des planches de qualités<span className="red-point">.</span></h2>
                                        <p className="quality-board__content secondary-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et </p>
                                        <ul className="quality-board__list">
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/icons/materials-icon.svg`} alt="Des matériaux nobles"/>
                                                <p>Des matériaux <span className="red-point">nobles</span>.</p>
                                            </li>
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/icons/flag-icon.svg`} alt="Made in France"/>
                                                <p>Made in <span className="red-point">France</span>.</p>
                                            </li>
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/icons/ecology-icon.svg`} alt="Respectueux de l'écologie"/>
                                                <p>Respectueux de l'<span className="red-point">écologie</span>.</p>
                                            </li>
                                        </ul>
                                    </article>
                                </div>
                            </div>
                            <div className="section new-collection" style={{ backgroundImage: `url('${process.env.PUBLIC_URL}/new-collection-bg.png')` }}>
                                <div className="container">
                                    <h2 className="secondary-title">Notre nouvelle collection<span className="red-point">.</span></h2>
                                    <article className="new-collection__list">
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/ChamonixRV.png`} alt="Planche Chamonix"/>
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/aiguilledumidiRV.png`} alt="Planche aiguille du midi"/>
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/MontBlancRV.png`} alt="Planche Mont blanc"/>
                                    </article>
                                    <Link to='/shop'><Button type="btn-first">Voir notre nouvelle collection</Button></Link>
                                </div>
                            </div>
                            <div className="section specificity container">
                                <h2 className="secondary-title">Nos spécificités<span className="red-point">.</span></h2>
                                <article className="specificity__infos">
                                    <div className="specificity__img-group">
                                        <img className="specificity__img" src={`${process.env.PUBLIC_URL}/specificities.png`} alt="Spécificités de nos planches"/>
                                        <span className={`specificity__tick-1 ${(currentTab === 0) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span>
                                        {/* <span className={`specificity__line-1 ${(currentTab === 0) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span> */}

                                        <span className={`specificity__tick-2 ${(currentTab === 1) ? 'active' : ''}`} onClick={() => setCurrentTab(1)}></span>
                                        {/* <span className={`specificity__line-2 ${(currentTab === 1) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span> */}

                                        <span className={`specificity__tick-3 ${(currentTab === 2) ? 'active' : ''}`} onClick={() => setCurrentTab(2)}></span>
                                        {/* <span className={`specificity__line-3 ${(currentTab === 2) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span> */}
                                    </div>
                                    <div className="specificity__content">
                                        <h3 className="third-title">{specificities[currentTab].title}</h3>
                                        <p>{specificities[currentTab].content}</p>
                                    </div>
                                </article>
                            </div>
                            <div className="section video">
                                <video autoPlay={true} loop muted className="wrapper__video">
                                    <source data-src={process.env.PUBLIC_URL + '/promo-video.mp4'} type="video/mp4" />
                                </video>
                                <div className="container">
                                    <h2 className="secondary-title video__title">Enjoy The Vibes<span className="red-point">.</span></h2>
                                </div>
                            </div>
                            <div className="section athletes">
                                <h2 className="secondary-title">Nos athlètes<span className="red-point">.</span></h2>
                                <p className="athletes-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                                <Link to='/athletes'><Button type="btn-first">Découvrir les autres athlètes</Button></Link>
                            </div>
                            <Footer />
                        </div>
                    );
                }}
            /> 
        </>
    );
}

export default Home;