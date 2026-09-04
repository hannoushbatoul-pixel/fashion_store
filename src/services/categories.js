import API from './client'

export const fetchCategories = () =>
  API.get('/categories')

export const fetchCategoryById = (categoryId) =>
  API.get(`/categories/${categoryId}`)

export const fetchCategoryProducts = (categoryId) =>
  API.get(`/categories/${categoryId}/products`)
