import PATH from './path'

const GUARD = {
  AUTH: [PATH.TODO],
  GUEST: [PATH.SIGN_IN, PATH.SIGN_UP, PATH.HOME],
}

export default GUARD
