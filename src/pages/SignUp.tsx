import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import LinkText from '../components/common/LinkText'
import TextField from '../components/common/TextField'
import useInput from '../hooks/useInput'
import useMutation from '../hooks/useMutation'
import { signUpAPI } from '../lib/api/auth'
import MESSAGE from '../lib/constants/message'
import PATH from '../lib/constants/path'
import REGEXP from '../lib/constants/regexp'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const email = useInput('')
  const password = useInput('')

  const { mutate, isError } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: () => {
      navigate(PATH.SIGN_IN)
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
      }
    },
  })

  const emailValid = REGEXP.EMAIL.test(email.value)
  const passwordValid = REGEXP.PASSWORD.test(password.value)

  const submitDisabled = !emailValid || !passwordValid

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    mutate({
      email: email.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col w-72">
        <TextField
          value={email.value}
          onChange={email.onChange}
          data-testid="email-input"
          placeholder="이메일"
          errorMessage={MESSAGE.ERROR.EMAIL_INVALID}
          validated={email.value === '' || emailValid}
        />
        <TextField
          className="mt-8"
          type="password"
          value={password.value}
          onChange={password.onChange}
          data-testid="password-input"
          placeholder="패스워드"
          errorMessage={MESSAGE.ERROR.PASSWORD_INVALID}
          validated={password.value === '' || passwordValid}
        />
        <div className="flex flex-col relative">
          <Button
            className="mt-12"
            label="회원가입"
            data-testid="signup-button"
            type="submit"
            disabled={submitDisabled}
          />
          {isError && (
            <p className="text-sm mt-2 text-red-500 absolute -bottom-6 w-full text-center">
              {errorMessage}
            </p>
          )}
        </div>
        <p className="text-gray-400 text-center mt-12 text-sm">
          이미 계정이 있으신가요? <LinkText to={PATH.SIGN_IN}>로그인</LinkText>
        </p>
      </div>
    </form>
  )
}

export default SignUp
