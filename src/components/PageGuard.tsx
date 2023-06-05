import { PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import GUARD from '../lib/constants/guard'
import PATH from '../lib/constants/path'
import STORAGE_KEY from '../lib/constants/storage'

const PageGuard = ({ children }: PropsWithChildren) => {
  const location = useLocation()
  const accessToken = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN)

  if (GUARD.AUTH.includes(location.pathname)) {
    if (!accessToken) return <Navigate to={PATH.SIGN_IN} replace />
  }

  if (GUARD.GUEST.includes(location.pathname)) {
    if (accessToken) return <Navigate to={PATH.TODO} replace />
  }

  return <>{children}</>
}

export default PageGuard
