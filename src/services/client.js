import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getApiError(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data
  if (typeof data?.message === 'string') return data.message
  if (data?.errors && typeof data.errors === 'object') {
    return Object.values(data.errors).flat().filter(Boolean).join(' ')
  }
  return fallback
}

export default API
