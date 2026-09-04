import API from './client'

export const fetchOrders = () =>
  API.get('/orders')

export const fetchOrderById = (orderId) =>
  API.get(`/orders/${orderId}`)

export const createOrder = (shippingAddress, paymentMethod = 'cash') =>
  API.post('/orders', null, {
    params: { shipping_address: shippingAddress, payment_method: paymentMethod },
  })

export const cancelOrder = (orderId) =>
  API.get(`/orders/${orderId}/cencel`)
