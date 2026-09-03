import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization =' Bearer ${token}';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => 
  API.post('/register', null, { params: userData });

export const loginUser = (credentials) => 
  API.post('/login', null, { params: credentials });

export const logoutUser = (userData) => 
  API.post('/logout', null, { params: userData });

export const getCurrentUser = () => 
  API.get('/user');

export const fetchProducts = (params) => 
  API.get('/products', { params });

export const fetchProductById = (id) => 
  API.get(`/products/${id}`);

export const fetchLatestProducts = () => 
  API.get('/products/latest');

export const fetchBestsellers = () => 
  API.get('/products/bestsellers');

export const searchProducts = (query) => 
  API.get('/products/search', { params: { q: query } });


export const fetchSimilarProducts = (productId) =>
  API.get(`/products/${productId}/similar`);

export const addProductReview = (productId, reviewData) =>
  API.post(`/products/${productId}/review`, null, { params: reviewData });

export const fetchCategories = () =>
  API.get('/categories');

export const fetchCategoryById = (categoryId) =>
  API.get(`/categories/${categoryId}`);

export const fetchCategoryProducts = (categoryId) =>
  API.get(`/categories/${categoryId}/products`);

export const fetchCart = () =>
  API.get('/cart');

export const addToCart = (productVariantId, quantity = 1) =>
  API.post('/cart/add', null, {
    params: { product_variant_id: productVariantId, quantity }
  });

export const updateCartItem = (itemId, quantity) =>
  API.put(`/cart/update/${itemId}`, null, { params: { quantity } });

export const removeCartItem = (itemId) =>
  API.delete(`/cart/remove/${itemId}`);

export const clearCart = () =>
  API.delete('/cart/clear');
export const fetchOrders = () => 
  API.get('/orders');

export const fetchOrderById = (orderId) => 
  API.get(`/orders/${orderId}`);

export const createOrder = (shippingAddress, paymentMethod = 'cash') => 
  API.post('/orders', null, { 
    params: { shipping_address: shippingAddress, payment_method: paymentMethod } 
  });

export const cancelOrder = (orderId) => 
  API.get(`/orders/${orderId}/cancel`);

export const fetchProfile = () => 
  API.get('/profile');

export const updateProfile = (profileData) => 
  API.put('/profile', null, { params: profileData });

export const changePassword = (passwordData) => 
  API.post('/profile/chenge-passowrd', null, { params: passwordData });

export default API;