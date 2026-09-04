import API from './client'

export const fetchCart = () =>
  API.get('/cart')

export const addToCart = (productVariantId, quantity = 1) =>
  API.post('/cart/add', null, {
    params: { product_variant_id: productVariantId, quantity },
  })

export const updateCartItem = (itemId, quantity) =>
  API.put(`/cart/update/${itemId}`, null, { params: { quantity } })

export const removeCartItem = (itemId) =>
  API.delete(`/cart/remove/${itemId}`)

export const clearCart = () =>
  API.delete('/cart/clear')
