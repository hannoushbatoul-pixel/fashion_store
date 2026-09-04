import API from './client'

export const registerUser = (userData) =>
  API.post('/register', null, { params: userData })

export const loginUser = (credentials) =>
  API.post('/login', null, { params: credentials })

export const logoutUser = (credentials = {}) =>
  API.post('/logout', null, { params: credentials })

export const getCurrentUser = () =>
  API.get('/user')
