import React, { useEffect, useContext, useState } from 'react';
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

    const fetchProducts = async () => {
        const productsCollection = await firebase.products.get();
        setProducts(
            productsCollection.docs.map((doc) => {
                return {...doc.data(), id : doc.id}
            })
        );
    };

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
            e.target.name.value = ''
            e.target.price.value = null
            fetchProducts();
        });
        
    };

    function slugify (str) {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();
      
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    
        return str;
    }

    function handleDelete(id){
        firebase.products.delete(id).then(() => {
            fetchProducts();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" onChange={onFileChange} />
                <input type="text" name="name" placeholder="NAME" />
                <input type="number" name="price" placeholder="PRICE" />
                <input type="text" name="content" placeholder="CONTENT" />
                <button>Submit</button>
            </form>
            <ul>
                {products.map((product) => {
                    return (
                        <li key={product.id} className="mb-5">
                            <img width="100" height="100" src={product.image} alt={product.name} />
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