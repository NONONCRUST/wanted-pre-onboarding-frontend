export type SignUpBody = {
  email: string
  password: string
}

export type SignInBody = {
  email: string
  password: string
}

export type SignInResponse = {
  access_token: string
}
