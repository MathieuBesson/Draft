import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FirebaseContext } from '../../Firebase'

const AdminCommandes = (props) => {

    const firebase = useContext(FirebaseContext);

    const [products, setProducts] = useState([]);
    const [fileUrl, setFileUrl] = React.useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
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
        if (!name || !fileUrl || !price || !content) {
            return;
        }
        await firebase.products.set({
            name,
            image: fileUrl,
            price,
            content,
            slug: slugify(name)
        }).then(() => {
            e.target.name.value = '';
            e.target.price.value = null;
            e.target.content.value = '';
            fetchProducts();
        });

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
        <div>
            <h2 className="mt-4">Administration : Page des produits </h2>
            <form className="mt-3 mb-5" onSubmit={onSubmit}>
                <h3>Créer un produit</h3>
                <div class="form-group">
                    <label for="name">Nom</label>
                    <input type="text" class="form-control" name="name" id="name" placeholder="Mistral" />
                </div>
                <div class="form-group">
                    <label for="price">Prix</label>
                    <input type="number" class="form-control" name="price" id="price" placeholder="Password" />
                </div>
                <div class="form-group">
                    <label for="content">Description</label>
                    <textarea class="form-control" id="content" name="content" rows="3" placeholder="Le produit est.."></textarea>
                </div>
                <div class="form-group">
                    <input type="file" onChange={onFileChange} class="form-control-file" id="image" />
                </div>
                <button type="submit" class="btn btn-primary">Enregister le produit</button>
            </form>
            <ul className="d-flex">
                {products.map((product) => {
                    return (
                        <li key={product.id} className="mb-5 mr-3">
                            <img max-width="600" src={product.image} alt={product.name} />
                            <p>{product.name}</p>
                            <p>{product.price} €</p>
                            <button className="btn btn-primary" onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AdminCommandes;