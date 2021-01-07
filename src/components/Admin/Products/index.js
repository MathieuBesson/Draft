import React, { useEffect, useContext, useState, useCallback, Fragment } from 'react';
import { FirebaseContext } from '../../Firebase'
import Header from '../../Header'


const AdminCommandes = (props) => {

    const firebase = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);
    const [file, setFile] = useState({});
    // const [fileUrl, setFileUrl] = useState(null);
    // const [fileUrl, setFileUrl] = useState(null);

    const [error, setError] = useState(null);


    const onFileChange = async (e) => {
        const fileSrc = e.target.files[0];
        const storageRef = firebase.storage.ref();
        const fileRef = storageRef.child(fileSrc.name);
        await fileRef.put(fileSrc);
        console.log(file)
        setFile({ ...file, [e.target.name]: await fileRef.getDownloadURL() });
    };

    const fetchProducts = useCallback(async () => {
        const productsCollection = await firebase.products.get();
        setProducts(
            productsCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
    }, [firebase.products]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const content = e.target.content.value;
        console.log(file.mainFile, file.secondFile, file.thirdFile)
        if (!name || file.mainFile === null || file.secondFile === null || file.thirdFile === null || !price || !content) {
            setError('Tous vos champs ne sont pas remplis')
            return;
        }
        setError(null)
        await firebase.products.set({
            name,
            mainImage: file.mainFile,
            price,
            content,
            slug: slugify(name),
            files: { mainFile: file.mainFile, secondFile: file.secondFile, thirdFile: file.thirdFile }
        }).then(() => {
            e.target.name.value = '';
            e.target.price.value = null;
            e.target.content.value = '';
            fetchProducts();
        });
        // console.log(file)
        // console.log({
        //         name,
        //         mainImage: file.mainFile,
        //         price,
        //         content,
        //         slug: slugify(name),
        //         files: {mainFile: file.mainFile, secondFile: file.secondFile, thirdFile: file.thirdFile}
        //     })

    };

    function slugify(str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();

        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to = "aaaaeeeeiiiioooouuuunc------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');

        return str;
    }

    function handleDelete(id) {
        firebase.products.delete(id).then(() => {
            fetchProducts();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <h2 className="mt-4">Administration : Page des produits </h2>
            <form className="mt-3 mb-5" onSubmit={onSubmit}>
                <h3>Créer un produit</h3>
                {!!error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Mistral" />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input type="number" className="form-control" name="price" id="price" placeholder="350" />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Description</label>
                    <textarea className="form-control" id="content" name="content" rows="3" placeholder="Le produit est.."></textarea>
                </div>
                <div className="form-group">
                    <input type="file" onChange={onFileChange} name="mainFile" className="form-control-file" id="image" />
                </div>
                <div className="form-group">
                    <input type="file" onChange={onFileChange} name="secondFile" className="form-control-file" id="image" />
                </div>
                <div className="form-group">
                    <input type="file" onChange={onFileChange} name="thirdFile" className="form-control-file" id="image" />
                </div>
                <button type="submit" className="btn-first m-0">Enregister le produit</button>
            </form>
            <ul className="d-flex flex-wrap">
                {products.map((product) => {
                    return (
                        <li key={product.id} className="mb-5 mr-3 card">
                            <img max-width="600" src={product.mainImage} alt={product.name} />
                            <h3 className="card-title">{product.name}</h3>
                            <p className="card-text">{product.price} €</p>
                            <button className="btn-second" onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default AdminCommandes;