import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FirebaseContext } from 'helpers/Firebase'
import { uid } from 'react-uid';


const AdminCommandes = (props) => {

    const firebase = useContext(FirebaseContext);
    const [commands, setCommands] = useState([])

    const fetchProducts = useCallback(async (mounted) => {
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

    function DateToString(timestamp) {
        let date = new Date(timestamp);
        return date.toLocaleString()
    }


    return (
        <div>
            <h2 className="mt-4">Administration : Récapitulatif des commandes </h2>
            <table className="table table-striped mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Utilisateur</th>
                        <th scope="col">Modalités</th>
                        <th scope="col">Commande</th>
                        <th scope="col">Total</th>

                    </tr>
                </thead>
                <tbody>
                    {commands !== [] && commands.map((command) => (
                        <tr key={command.id}>
                            <th>{command.userId.email}</th>
                            <td>
                                Commandé le : {DateToString(command.date)}<br />
                                    Livraison le : {DateToString(command.date + 1000 * 60 * 60 * 24 * 5)} <br />
                                    Lieu : {command.place}
                            </td>
                            <td className="d-flex flex-column">
                                {command.command.map((command) => (
                                    <p key={uid(command)}>
                                        Nom : {command.name}<br />
                                            Prix : {command.price} €<br />
                                            Quantité : {command.quantity}<br />
                                    </p>
                                ))}
                            </td>
                            <td>
                                Total : {command.total} €<br />
                                <button className="btn-first m-0" onClick={() => handleDelete(command.id)}>Commande livrée</button>
                            </td>
                        </tr>

                        // <div className="card flex-row" key={command.id}>
                        //     <h5 className="card-title">Utilisateur : {command.userId.email}</h5>
                        //     <div className="card">
                        //         <h5 className="card-title">Commandé le : {DateToString(command.date)}</h5>
                        //         <h5 className="card-title">Livraison le : {DateToString(command.date + 1000 * 60 * 60 * 24 * 5)}</h5>
                        //         <h5 className="card-title">Lieu : {command.place}</h5>
                        //     </div>
                        //     <div className="card">
                        //         {command.command.map((command) => (
                        //             <div className="card" style={{ width: "18rem", }} key={uid(command)}>
                        //                 <div className="card-body">
                        //                     <h5 className="card-title">Produits : {command.name}</h5>
                        //                     <h5 className="card-title">Prix : {command.price} €</h5>
                        //                     <h5 className="card-title">Quantité : {command.quantity}</h5>
                        //                 </div>
                        //             </div>
                        //         ))}
                        //     </div>
                        //     <h5 className="card-title">Total : {command.total} €</h5>
                        //     <button className="btn btn-primary" onClick={() => handleDelete(command.id)}>Commande livrée</button>
                        // </div>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCommandes;


