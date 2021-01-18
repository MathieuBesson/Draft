import React from 'react';
import './Button.scss'

const Button = ({children, type, action, disabled, clickAction}) => {
    // const setAction = 
    return (
        <button className={type} type={action} disabled={disabled} onClick={clickAction}>{children}</button>
    );
}

export default Button;