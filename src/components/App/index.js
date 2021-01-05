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
import Admin from '../Admin'
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
					{/* <div className="container"> */}
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/authentification" component={Authentification} />
							<Route exact path="/shop" render={(props) => <ProductsPage {...props} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/produits/:slug" render={(props) => <Product {...props} UpdateCart={(newProduct, id) => handleUpdateCart(newProduct, id)} />}/>
							<Route path="/athletes" component={CollaborationsPage} />
							<Route path="/panier" render={(props) => <CartPage {...props} UpdateProductQuantity={(id, newQuantity) => handleUpdateCartQuantity(id, newQuantity)} cart={cart} deleteProduct={(id) => handleDeleteProduct(id)} deleteCart={() => setCart([])}/>} />
							<Route path="/mon-compte" component={AccountPage} />
							<Route path="/mot-de-passe-oublie" component={ForgetPassword} />
							<Route path="/admin" component={Admin} />
							<Route component={ErrorPage} />
						</Switch>
					{/* </div> */}
					{/* <Footer /> */}
				</UserSessionContext.Provider>
			</Router>

		</div>
	);
}

export default App;
