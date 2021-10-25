import Axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (productId, qty) => async (dispatch, getstate) => {
  const { data } = await Axios.get(`/api/products/${productId}`)
  //console.log(data)
  //console.log(JSON.stringify(getstate().cart.cartItems))

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
