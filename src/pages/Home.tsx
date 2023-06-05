import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import PATH from '../lib/constants/path'

const Home = () => {
  return (
    <div className="flex flex-col w-28">
      <Link to={PATH.SIGN_IN} className="flex">
        <Button label="로그인" fullWidth />
      </Link>
      <Link to={PATH.SIGN_UP} className="mt-2 flex">
        <Button label="회원가입" variant="secondary" fullWidth />
      </Link>
    </div>
  )
}

export default Home
