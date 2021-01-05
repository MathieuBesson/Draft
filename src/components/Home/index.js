import React, { Fragment } from 'react';
import ReactFullpage from "@fullpage/react-fullpage";
import './Home.scss'
import Footer from '../Footer';
import Header from '../Header';



const Home = () => {

    // function onLeave (origin, destination, direction) {
    //     console.log("Leaving section " + origin.index);
    //   }
    //   function afterLoad(origin, destination, direction) {
    //     console.log("After load: " + destination.index);
    //   }

    return (
        <>
        <Header/>
        <ReactFullpage
            scrollOverflow={true}
            navigation={true}
            // onLeave={onLeave.bind(this)}
            // afterLoad={afterLoad.bind(this)}
            render={({ state, fullpageApi }) => {
                return (
                    <div id="fullpage-wrapper">
                        <div className="section presentation" style={{ background: `url('${process.env.PUBLIC_URL}/banner-home.svg')` }}>
                            <h1 className="primary-title">Enjoy The Vibes<span className="red-point">.</span></h1>
                            <p className="presentation__content">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</p>
                            <button className='btn btn-first'>Voir notre nouvelle collection</button>
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
                                <button className='btn btn-first'>Voir notre nouvelle collection</button>
                            </div>
                        </div>
                        <div className="section specificity">
                            <h2 className="secondary-title">Nos spécificités<span className="red-point">.</span></h2>
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
                            <button className='btn btn-first'>Découvrir les autres athlètes</button>
                        </div>
                        <Footer/>
                        {/* <div class="section fp-auto-height">
                            <div class="content">Four</div>
                        </div> */}
                    </div>
                );
            }}
        />
    </>
    );

}

export default Home;