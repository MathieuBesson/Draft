import React from 'react';
import './Header.scss'

const Header = ({type, backgroundUrl, children}) => {
    return (
        <header className={type + ' header'} style={{ backgroundImage: `url('${backgroundUrl}')` }}>
            {children}
        </header>
    );
}

export default Header;