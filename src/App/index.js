import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from '../components/Header';
import Home from '../pages/Home';
import Footer from '../components/Footer';
import ErrorPage from '../pages/ErrorPage';
import Authentification from '../pages/Authentification';
import ProductsPage from '../pages/ProductsPage';
import Athletes from '../pages/Athletes';
import Athlete from '../pages/Athlete';

import Cart from '../pages/Cart';
import Account from '../pages/Account';
import ForgetPassword from '../components/ForgetPassword';
import UserSessionContext from '../helpers/UserSession';
import { FirebaseContext } from '../helpers/Firebase';
import Admin from '../pages/Admin'
import Product from '../pages/Product'
import ScrollToTop from '../helpers/Scroll'


function App() {

	const [userSession, setUserSession] = useState(null)
	const [userData, setUserData] = useState('not-connected');
	const [isConnected, setIsConnected] = useState(false);
	const [cart, setCart] = useState([])
	const firebase = useContext(FirebaseContext)

	useEffect(() => {
		let listener = firebase.auth.onAuthStateChanged(user => {
			setUserSession(user)
			setUserData(null)
			setIsConnected(false)
			if (user !== null) {
				setIsConnected(true)
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
							<Route path="/authentification" render={(props) => <Authentification {...props} cartLenght={cart.length} isConnected={isConnected}/>} />
							<Route exact path="/shop" render={(props) => <ProductsPage {...props} cartLenght={cart.length} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/produits/:slug" render={(props) => <Product {...props} cartLenght={cart.length} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/athletes/:slug" render={(props) => <Athlete {...props} cartLenght={cart.length} />}/>
							<Route path="/athletes" render={(props) => <Athletes {...props} cartLenght={cart.length}/>} />
							<Route path="/panier" render={(props) => <Cart {...props} cartLenght={cart.length} isConnected={isConnected} updateProductQuantity={(id, newQuantity) => handleUpdateCartQuantity(id, newQuantity)} cart={cart} deleteProduct={(id) => handleDeleteProduct(id)} deleteCart={() => setCart([])}/>} />
							<Route path="/mot-de-passe-oublie" component={ForgetPassword} />
							<Route exact path="/admin" render={(props) => <Admin {...props} cartLenght={cart.length} isConnected={isConnected}/>} />
							<Route component={ErrorPage} />
						</Switch>
				</UserSessionContext.Provider>
			</Router>

		</div>
	);
}

export default App;
