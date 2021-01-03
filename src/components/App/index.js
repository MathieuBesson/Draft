import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from '../Header';
import Home from '../Home';
import Footer from '../Footer';
import ErrorPage from '../ErrorPage';
import Authentification from '../Authentification';
import ProductsPage from '../ProductsPage';
import CollaborationsPage from '../CollaborationsPage';
import CartPage from '../CartPage';
import AccountPage from '../AccountPage';
import ForgetPassword from '../ForgetPassword';
import UserSessionContext from '../UserSession';
import { FirebaseContext } from '../Firebase';
import AdminProducts from '../Admin/Products'
import AdminCommandes from '../Admin/Commandes'
import Product from '../Product'

function App() {

	const [userSession, setUserSession] = useState(null)
	const [userData, setUserData] = useState(null)
	const [cart, setCart] = useState([])
	const firebase = useContext(FirebaseContext)

	useEffect(() => {
		let listener = firebase.auth.onAuthStateChanged(user => {
			setUserSession(user)
			setUserData(null)
			if (user !== null) {
				firebase.user(user.uid)
					.get().then(doc => {
						if (doc && doc.exists) {
							setUserData(doc.data())
						}
					})
					.catch((err) => console.log(err));
			}
		});
		return () => {
			listener()
		}
	}, [firebase.auth])

	console.log(cart)

	return (
		<div>
			<Router>
				<UserSessionContext.Provider value={{ userSession, userData }}>
					<Header />

					<div className="container">
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/authentification" component={Authentification} />
							<Route exact path="/produits" component={ProductsPage} />
							
							<Route path="/produits/:slug" render={() => <Product handleCart={(newCart) => setCart([...cart, newCart])} />}/>
							<Route path="/collaborations" component={CollaborationsPage} />
							<Route path="/panier" render={() => <CartPage handleCart={(newCart) => setCart([...cart, newCart])} cart={cart}/>} />
							<Route path="/mon-compte" component={AccountPage} />
							<Route path="/mot-de-passe-oublie" component={ForgetPassword} />
							<Route path="/admin/produits" component={AdminProducts} />
							<Route path="/admin/commandes" component={AdminCommandes} />
							<Route component={ErrorPage} />
						</Switch>
					</div>
					<Footer />
				</UserSessionContext.Provider>
			</Router>

		</div>
	);
}

export default App;
