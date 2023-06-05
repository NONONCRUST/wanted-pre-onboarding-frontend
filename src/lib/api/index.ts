import axios from 'axios'
import BASE_URL from '../constants/api'
import STORAGE_KEY from '../constants/storage'

const axiosInstance = axios.create({
  baseURL: BASE_URL.DEV,
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

export default axiosInstance
