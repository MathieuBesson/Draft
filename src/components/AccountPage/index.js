import React, { useContext, useEffect, useState } from 'react';
import LogOut from '../LogOut';
import UserSessionContext from '../UserSession'
import { FirebaseContext } from '../Firebase'


const AccountPage = (props) => {

    const userSession = useContext(UserSessionContext);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        if (userSession.userData === null) {
            props.history.push({
                pathname: '/authentification',
                state: { errorMessage: 'Veuillez vous connecter pour accèder à votre compte' }
            })
        }

    }, [userSession.userData, props.history]);


    let errorMessage = null;

    if (![null, undefined].includes(props.location.state)) {
        errorMessage = props.location.state.errorMessage;
        window.history.replaceState(null, '')
    }


    return (
        <div>
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            {userSession.userData !== null &&
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h6 className="card-title">{`Prénom : ${userSession.userData.firstName}`}</h6>
                    <h6 className="card-title">{`Nom : ${userSession.userData.lastName}`}</h6>
                    <h6 className="card-title">{`Mail : ${userSession.userData.email}`}</h6>
                    <h6 className="card-title">{`Role : ${userSession.userData.role}`}</h6>
                    {userSession !== null && <LogOut history={props.history}/>}
                </div>
            </div>
            }  
        </div>
    )
}

export default AccountPage;