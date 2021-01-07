import React, { useEffect, useContext, useState, useCallback } from 'react';
import { FirebaseContext } from '../../Firebase'


const AdminAthletes = (props) => {

    const firebase = useContext(FirebaseContext);

    const [athletes, setAthletes] = useState([]);
    const [file, setFile] = useState({});

    const [error, setError] = useState(null);


    const onFileChange = async (e) => {
        const fileSrc = e.target.files[0];
        const storageRef = firebase.storage.ref();
        const fileRef = storageRef.child(fileSrc.name);
        await fileRef.put(fileSrc);
        console.log(file)
        setFile({ ...file, [e.target.name]: await fileRef.getDownloadURL() });
    };

    const fetchAthletes = useCallback(async () => {
        const athletesCollection = await firebase.athletes.get();
        setAthletes(
            athletesCollection.docs.map((doc) => {
                return { ...doc.data(), id: doc.id }
            })
        );
    }, [firebase.athletes]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const nationality = e.target.nationality.value;
        const discipline = e.target.discipline.value;
        const birthday = e.target.birthday.value;
        const shortDescription = e.target.shortDescription.value;
        const biography = e.target.biography.value;
        const video = e.target.video.value;
        const resultTitle1 = e.target.resultTitle1.value;
        const resultContent1 = e.target.resultContent1.value;
        const resultTitle2 = e.target.resultTitle2.value;
        const resultContent2 = e.target.resultContent2.value;
        const resultTitle3 = e.target.resultTitle3.value;
        const resultContent3 = e.target.resultContent3.value;

        const condition = [file.mainFile, file.secondFile, firstName,
            lastName, nationality, discipline, shortDescription,
            video, birthday, resultTitle1, resultTitle2, resultTitle3,
            resultContent1, resultContent2, resultContent3, biography].some((item) => item === null)
        if (condition) {
            setError('Tous vos champs ne sont pas remplis')
            return;
        }
        if ([resultTitle1,resultTitle2,resultTitle3].every((val, i, arr) => val === arr[0])) {
            setError('Plusieurs de vos évenements sont, ce n\'est pas possible')
            return;
        }
        setError(null)
        console.log(resultTitle1, resultTitle2, resultTitle3, resultContent1, resultContent2, resultContent3)
        console.log({palmares: {
            [resultTitle1]: resultContent1,
            [resultTitle2]: resultContent2,
            [resultTitle3]: resultContent3,
        }})
        console.log({
            cutOutImage: file.mainFile,
            mainImage: file.mainFile,
            biography,
            birthday,
            discipline,
            firstName,
            lastName,
            nationality,
            palmares: {
                [resultTitle1]: resultContent1,
                [resultTitle2]: resultContent2,
                [resultTitle3]: resultContent3,
            },
            shortDescription,
            slug: slugify(firstName + ' ' + lastName),
            video
        })
        await firebase.athletes.set({
            cutOutImage: file.mainFile,
            mainImage: file.mainFile,
            biography,
            birthday,
            discipline,
            firstName,
            lastName,
            nationality,
            palmares: {
                [resultTitle1]: resultContent1,
                [resultTitle2]: resultContent2,
                [resultTitle3]: resultContent3,
            },
            shortDescription,
            slug: slugify(firstName + ' ' + lastName),
            video
        }).then(() => {
            // [firstName, lastName, nationality, discipline, shortDescription,
            // video, birthday, resultTitle1, resultTitle2, resultTitle3,
            // resultContent1, resultContent2, resultContent3, biography].forEach(item => {
            //     e.target[item].value = '';
            // })

            fetchAthletes();
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
        firebase.athletes.delete(id).then(() => {
            fetchAthletes();
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useEffect(() => {
        fetchAthletes();
    }, [fetchAthletes]);

    return (
        <>
            <h2 className="mt-4">Administration : Page des athletes </h2>
            <form className="mt-3 mb-5" onSubmit={onSubmit}>
                <h3>Ajouter un athlete</h3>
                {!!error && <div className="alert alert-danger" role="alert">{error}</div>}
                <div className="form-group">
                    <label htmlFor="firstName">Prénom</label>
                    <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Anna" />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Nom</label>
                    <input type="number" className="form-control" name="lastName" id="lastName" placeholder="350" />
                </div>
                <div className="form-group">
                    <label htmlFor="nationality">Nationality</label>
                    <input type="text" className="form-control" id="nationality" name="nationality" placeholder="Snowboard de au level" />
                </div>
                <div className="form-group">
                    <label htmlFor="discipline">Discipline</label>
                    <input type="text" className="form-control" id="discipline" name="discipline" placeholder="Snowboard de au level" />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Anniversaire</label>
                    <input type="text" className="form-control" id="birthday" name="birthday" placeholder="15 Juillet 1975" />
                </div>
                <div className="form-group">
                    <label htmlFor="shortDescription">Petite Description</label>
                    <input type="text" className="form-control" id="shortDescription" name="shortDescription" placeholder="Petite description" />
                </div>
                <div className="form-group">
                    <label htmlFor="biography">Petite Description</label>
                    <textarea className="form-control" id="biography" name="biography" placeholder="Biography" row="6"></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="video">Lien vidéo Youtube</label>
                    <input type="text" className="form-control" id="video" name="video" placeholder="lien" />
                </div>
                <div className="form-group mt-5">
                    <label htmlFor="resultTitle1">Premier résultat important titre</label>
                    <input type="text" className="form-control" id="resultTitle1" name="resultTitle1" placeholder="Championnat du monde" />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="resultContent1">Premier résultat important contenu</label>
                    <input type="text" className="form-control" id="resultContent1" name="resultContent1" placeholder="Medaille d'or" />
                </div>
                <div className="form-group">
                    <label htmlFor="resultTitle2">Second résultat important titre</label>
                    <input type="text" className="form-control" id="resultTitle2" name="resultTitle2" placeholder="Championnat du monde" />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="resultContent2">Second résultat important contenu</label>
                    <input type="text" className="form-control" id="resultContent2" name="resultContent2" placeholder="Medaille d'or" />
                </div>
                <div className="form-group">
                    <label htmlFor="resultTitle3">Dernier résultat important titre</label>
                    <input type="text" className="form-control" id="resultTitle3" name="resultTitle3" placeholder="Championnat du monde" />
                </div>
                <div className="form-group mb-5">
                    <label htmlFor="resultContent3">Second résultat important contenu</label>
                    <input type="text" className="form-control" id="resultContent3" name="resultContent3" placeholder="Medaille d'or" />
                </div>
                <div className="form-group">
                    <input type="file" onChange={onFileChange} name="mainFile" className="form-control-file" id="image" />
                </div>
                <div className="form-group">
                    <input type="file" onChange={onFileChange} name="secondFile" className="form-control-file" id="image" />
                </div>
                <button type="submit" className="btn-first m-0">Enregister l'athlete</button>
            </form>
            <ul className="d-flex flex-wrap">
                {athletes.map((athlete) => {
                    return (
                        <li key={athlete.id} className="mb-5 mr-3 card w-25">
                            <img src={athlete.mainImage} alt={athlete.id} />
                            <h3 className="card-title">{athlete.firstName} {athlete.lastName}</h3>
                            <p className="card-text">{athlete.discipline}</p>
                            <button className="btn-second" onClick={() => handleDelete(athlete.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default AdminAthletes;