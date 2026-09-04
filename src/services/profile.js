import API from './client'

export const fetchProfile = () =>
  API.get('/profile')

export const updateProfile = (profileData) =>
  API.put('/profile', null, { params: profileData })

export const changePassword = (passwordData) =>
  API.post('/profile/chenge-passowrd', null, { params: passwordData })
