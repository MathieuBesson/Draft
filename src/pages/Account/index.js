import React, { useContext, useEffect } from 'react';
import UserSessionContext from 'helpers/UserSession'
import Header from 'components/Header'



const Account = (props) => {

    const user = useContext(UserSessionContext);

    useEffect(() => {
        if (user.userSession === null) {
            props.history.push({
                pathname: '/authentification',
                state: { errorMessage: 'Veuillez vous connecter pour accèder à votre compte' }
            })
        }
    }, [user.userSession, props.history]);


    let errorMessage = null;

    if (![null, undefined].includes(props.location.state)) {
        errorMessage = props.location.state.errorMessage;
        window.history.replaceState(null, '')
    }


    return (
        <div>
            <Header background={{backgroundColor: "#1B2B40"}} />
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            {user.userData !== null &&
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                    <h6 className="card-title">{`Prénom : ${user.userData.firstName}`}</h6>
                    <h6 className="card-title">{`Nom : ${user.userData.lastName}`}</h6>
                    <h6 className="card-title">{`Mail : ${user.userData.email}`}</h6>
                    <h6 className="card-title">{`Role : ${user.userData.role}`}</h6>
                </div>
            </div>
            }  
        </div>
    )
}

export default Account;