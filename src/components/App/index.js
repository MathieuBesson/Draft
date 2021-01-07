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
import Collaboration from '../Collaboration';

import CartPage from '../CartPage';
import AccountPage from '../AccountPage';
import ForgetPassword from '../ForgetPassword';
import UserSessionContext from '../UserSession';
import { FirebaseContext } from '../Firebase';
import Admin from '../Admin'
import Product from '../Product'
import ScrollToTop from '../Scroll'


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
	}, [firebase])

	const handleUpdateCartQuantity = (id, newQuantity) => {
		if(newQuantity <= 0){
			handleDeleteProduct(id)
			console.log(newQuantity)
			return 
		}
		let key;
		let obj = cart.find((element, index) => {key = index; return element.id === id})
		obj.quantity = newQuantity
		let newCart = [...cart];
		newCart[key] = obj
		setCart(newCart);
	}

	const handleDeleteProduct = (id) =>{
		let key;
		let obj = cart.find((element, index) => {key = index; return element.id === id})
		let newCart =  cart
		newCart.splice(key, 1);
		setCart([...newCart])
	}

	const handleUpdateCart = (newProduct, id) => {
		let odlCartProductsId = cart.map(product => product.id)
		if(odlCartProductsId.includes(id)){
			let oldProduct = cart.find(product => product.id = id)
			handleUpdateCartQuantity(id, newProduct.quantity + oldProduct.quantity)
		} else {
			setCart([...cart, newProduct])
		}
	}

	return (
		<div>
			<Router>
				<UserSessionContext.Provider value={{ userSession, userData }}>
					<ScrollToTop />
						<Switch>
							<Route exact path="/" render={(props) => <Home {...props} cartLenght={cart.length}/>} />
							<Route path="/authentification" render={(props) => <Authentification {...props} cartLenght={cart.length}/>} />
							<Route exact path="/shop" render={(props) => <ProductsPage {...props} cartLenght={cart.length} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/produits/:slug" render={(props) => <Product {...props} cartLenght={cart.length} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/athletes/:slug" render={(props) => <Collaboration {...props} cartLenght={cart.length} />}/>
							<Route path="/athletes" render={(props) => <CollaborationsPage {...props} cartLenght={cart.length}/>} />
							<Route path="/panier" render={(props) => <CartPage {...props} cartLenght={cart.length} UpdateProductQuantity={(id, newQuantity) => handleUpdateCartQuantity(id, newQuantity)} cart={cart} deleteProduct={(id) => handleDeleteProduct(id)} deleteCart={() => setCart([])}/>} />
							<Route path="/mot-de-passe-oublie" component={ForgetPassword} />
							<Route exact path="/admin" render={(props) => <Admin {...props} cartLenght={cart.length} />} />
							<Route component={ErrorPage} />
						</Switch>
				</UserSessionContext.Provider>
			</Router>

		</div>
	);
}

export default App;
