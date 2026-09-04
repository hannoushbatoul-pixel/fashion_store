import API from './client'

export const fetchProducts = (params = {}) =>
  API.get('/products', { params })

export const fetchProductById = (id) =>
  API.get(`/products/${id}`)

export const fetchLatestProducts = () =>
  API.get('/products/latest')

export const fetchBestsellers = () =>
  API.get('/products/bestsellers')

export const searchProducts = (query) =>
  API.get('/products/search', { params: { q: query } })

export const fetchSimilarProducts = (productId) =>
  API.get(`/products/${productId}/similar`)

export const addProductReview = (productId, reviewData) =>
  API.post(`/products/${productId}/review`, null, { params: reviewData })
