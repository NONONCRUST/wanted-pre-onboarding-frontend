import { isAxiosError } from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import LinkText from '../components/common/LinkText'
import TextField from '../components/common/TextField'
import useInput from '../hooks/useInput'
import useMutation from '../hooks/useMutation'
import { signInAPI } from '../lib/api/auth'
import MESSAGE from '../lib/constants/message'
import PATH from '../lib/constants/path'
import REGEXP from '../lib/constants/regexp'
import STORAGE_KEY from '../lib/constants/storage'

const SignIn = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const email = useInput('')
  const password = useInput('')

  const { mutate, isError } = useMutation({
    mutationFn: signInAPI,
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.access_token)
      navigate(PATH.TODO)
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        error.response?.data.statusCode === 401 &&
          setErrorMessage(MESSAGE.ERROR.SIGN_IN_FAILED)
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
          type="password"
          value={password.value}
          onChange={password.onChange}
          className="mt-8"
          data-testid="password-input"
          placeholder="패스워드"
          errorMessage={MESSAGE.ERROR.PASSWORD_INVALID}
          validated={password.value === '' || passwordValid}
        />
        <div className="flex flex-col relative">
          <Button
            className="mt-12"
            label="로그인"
            data-testid="signin-button"
            type="submit"
            disabled={submitDisabled}
          />
          {isError && (
            <p className="text-sm mt-2 text-red-500 absolute -bottom-6 text-center w-full">
              {errorMessage}
            </p>
          )}
        </div>
        <p className="text-gray-400 text-center mt-12 text-sm">
          회원이 아니신가요? <LinkText to={PATH.SIGN_UP}>회원가입</LinkText>
        </p>
      </div>
    </form>
  )
}

export default SignIn
