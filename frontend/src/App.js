import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Route, BrowserRouter, Link } from 'react-router-dom'
import { signout } from './actions/userActions'
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingAdressScreen from './screens/ShippingAdressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen'
import placeOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
function App() {
  const cart = useSelector((state) => state.cart)
  const cartItems = cart.cartItems
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <header className='row'>
          <div>
            <Link className='brand' to='/'>
              Amazonia
            </Link>
          </div>

          <div>
            <Link to='/cart'>
              Cart
              {cartItems.length > 0 && (
                <span className='badge'>{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className='dropdown'>
                <Link to='#'>
                  {userInfo.name}
                  <i className='fa fa-caret-down' />
                </Link>
                <ul className='dropdown-content'>
                  <Link to='#signout' onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to='/signin'>Sign in</Link>
            )}
          </div>
        </header>

        <main>
          <Route path='/cart/:id?' component={CartScreen}></Route>
          <Route path='/product/:id' component={ProductScreen}></Route>
          <Route path='/signin' component={SigninScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/' component={HomeScreen} exact></Route>
          <Route path='/payment' component={PaymentMethodScreen}></Route>
          <Route path='/placeorder' component={placeOrderScreen}></Route>
          <Route path='/order/:id' component={OrderScreen}></Route>
          <Route path='/shipping' component={ShippingAdressScreen}></Route>
        </main>

        <footer className='row center'>All rights reserved</footer>
      </div>
    </BrowserRouter>
  )
}

export default App
