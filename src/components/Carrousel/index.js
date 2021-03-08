import React from 'react';

const Carrousel = ({files, setCurrentImg, currentImg}) => {
    return (
        <article className="product__images">
            <div className="product__group-miniature">
                <div className="product__miniature" style={{ backgroundImage: `url('${files.mainFile}')` }} onClick={() => setCurrentImg(files.mainFile)} alt="Main file"></div>
                <div className="product__miniature" style={{ backgroundImage: `url('${files.secondFile}')` }} onClick={() => setCurrentImg(files.secondFile)} alt="Second file"></div>
                <div className="product__miniature" style={{ backgroundImage: `url('${files.thirdFile}')` }} onClick={() => setCurrentImg(files.thirdFile)} alt="Third file"></div>
            </div>
            <div className={"product__current "+ (currentImg === files.mainFile ? "rotate" : '')}  style={{ backgroundImage: `url('${currentImg}')` }}>
                {/* <div className={"product__current-img " + (currentImg === files.mainFile ? "rotate" : '')} ></div> */}
            </div>
        </article>
    );
}

export default Carrousel;