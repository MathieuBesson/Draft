import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FirebaseContext } from '../../Firebase'
import { uid } from 'react-uid';


const AdminCommandes = (props) => {

    const firebase = useContext(FirebaseContext);
    const [commands, setCommands] = useState([])

    const fetchProducts = useCallback(async () => {
        const commandCollection = await firebase.commands.get();
        setCommands(
            commandCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
    }, [firebase.commands])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleDelete = (id) => {
        firebase.commands.delete(id).then(() => {
            fetchProducts();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function DateToString(timestamp){
        let date = new Date(timestamp);
        return date.toLocaleString()
    }


    return (
        <div>
            <h2>Administration : Page de commande </h2>
            {commands !== [] && commands.map((command) => (
                <div className="card" style={{ width: "18rem" }} key={command.id}>
                    <h5 className="card-title">Utilisateur : {command.userId.email}</h5>
                    <h5 className="card-title">Commandé le : {DateToString(command.date)}</h5>
                    <h5 className="card-title">Livraison prévu pour le : {DateToString(command.date + 1000*60*60*24*5)}</h5>
                    <h5 className="card-title">Lieu : {command.place}</h5>
                    {command.command.map((command) => (
                        <div className="card" style={{ width: "18rem", }} key={uid(command)}>
                            <div className="card-body">
                                <h5 className="card-title">Produits : {command.name}</h5>
                                <h5 className="card-title">Prix : {command.price} €</h5>
                                <h5 className="card-title">Quantité : {command.quantity}</h5>
                            </div>
                        </div>
                    ))}
                    <h5 className="card-title">Total : {command.total} €</h5>
                    <button className="btn btn-primary" onClick={() => handleDelete(command.id)}>Commande livrée</button>
                </div>
            ))}


        </div>
    );
}

export default AdminCommandes;


