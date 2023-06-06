import axiosInstance from '.'
import { SignInBody, SignInResponse, SignUpBody } from '../../types/api/auth'

export const signUpAPI = async (body: SignUpBody) => {
  const response = await axiosInstance.post('/auth/signup', body)
  return response.data
}

export const signInAPI = async (body: SignInBody) => {
  const response = await axiosInstance.post<SignInResponse>(
    '/auth/signin',
    body
  )
  return response.data
}
