import axiosInstance from '.'
import { SignInBody, SignInResponse, SignUpBody } from '../../types/api/auth'

export const signUpAPI = (body: SignUpBody) => {
  return axiosInstance.post('/auth/signup', body)
}

export const signInAPI = (body: SignInBody) => {
  return axiosInstance.post<SignInResponse>('/auth/signin', body)
}
