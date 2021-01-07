import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactFullpage from "@fullpage/react-fullpage";
import './Home.scss'
import Footer from '../Footer';
import Header from '../Header';



const Home = (props) => {

    const [currentTab, setCurrentTab] = useState(0)

    return (
        <>
            <Header cartLenght={props.cartLenght} background={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%)" }} />
            <ReactFullpage
                scrollOverflow={true}
                navigation={true}
                render={() => {
                    return (
                        <div id="fullpage-wrapper">
                            <div className="section presentation" style={{ background: `url('${process.env.PUBLIC_URL}/banner-home.svg')` }}>
                                <h1 className="primary-title">Enjoy The Vibes<span className="red-point">.</span></h1>
                                <p className="presentation__content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</p>
                                <Link className='btn-first' to='/shop'>Voir notre nouvelle collection</Link>
                            </div>
                            <div className="section quality-board">
                                <div className="container">
                                    <article className="quality-board__block">
                                        <h2 className="secondary-title">Des planches de qualités<span className="red-point">.</span></h2>
                                        <p className="quality-board__content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et </p>
                                        <ul className="quality-board__list">
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/materials-icon.svg`} />
                                                <p>Des matériaux <span className="red-point">nobles</span>.</p>
                                            </li>
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/flag-icon.svg`} />
                                                <p>Made in <span className="red-point">France</span>.</p>
                                            </li>
                                            <li className="quality-board__list-item">
                                                <img src={`${process.env.PUBLIC_URL}/ecology-icon.svg`} />
                                                <p>Respectueux de l'<span className="red-point">écologie</span>.</p>
                                            </li>
                                        </ul>
                                    </article>
                                </div>
                            </div>
                            <div className="section new-collection" style={{ background: `url('${process.env.PUBLIC_URL}/new-collection-bg.png')` }}>
                                <div className="container">
                                    <h2 className="secondary-title">Notre nouvelle collection<span className="red-point">.</span></h2>
                                    <article className="new-collection__list">
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/new-collection-snow1.png`} />
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/new-collection-snow2.png`} />
                                        <img className="new-collection__img" src={`${process.env.PUBLIC_URL}/new-collection-snow3.png`} />
                                    </article>
                                    <Link className='btn-first' to='/shop'>Voir notre nouvelle collection</Link>
                                </div>
                            </div>
                            <div className="section specificity container">
                                <h2 className="secondary-title">Nos spécificités<span className="red-point">.</span></h2>
                                <article className="specificity__infos">
                                    <div className="specificity__img-group">
                                        <img className="specificity__img" src={`${process.env.PUBLIC_URL}/specificities.png`} />
                                        <span className={`specificity__tick-1 ${(currentTab === 0) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span>
                                        <span className={`specificity__line-1 ${(currentTab === 0) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span>

                                        <span className={`specificity__tick-2 ${(currentTab === 1) ? 'active' : ''}`} onClick={() => setCurrentTab(1)}></span>
                                        <span className={`specificity__line-2 ${(currentTab === 1) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span>

                                        <span className={`specificity__tick-3 ${(currentTab === 2) ? 'active' : ''}`} onClick={() => setCurrentTab(2)}></span>
                                        <span className={`specificity__line-3 ${(currentTab === 2) ? 'active' : ''}`} onClick={() => setCurrentTab(0)}></span>

                                    </div>
                                    <div className="specificity__content">
                                        {currentTab === 0 &&
                                            <>
                                                <h3 className="third-title">Les talons</h3>
                                                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
                                            </>
                                        }
                                        {currentTab === 1 &&
                                            <>
                                                <h3 className="third-title">Différentes tailles</h3>
                                                <p>Sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. </p>
                                            </>
                                        }
                                        {currentTab === 2 &&
                                            <>
                                                <h3 className="third-title">Les spatules</h3>
                                                <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet</p>
                                            </>
                                        }
                                    </div>
                                </article>
                            </div>
                            <div className="section video">
                                <video autoPlay={true} loop muted className="wrapper__video" height="100%">
                                    <source data-src={process.env.PUBLIC_URL + '/promo-video.mp4'} type="video/mp4" />
                                </video>
                                <div className="container">
                                    <h2 className="secondary-title video__title">Enjoy The Vibes<span className="red-point">.</span></h2>
                                </div>
                            </div>
                            <div className="section athletes">
                                <h2 className="secondary-title">Nos athlètes<span className="red-point">.</span></h2>
                                <p className="athletes-content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                                <Link className='btn-first' to='/athletes'>Découvrir les autres athlètes</Link>
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