import { useOutlet, Navigate } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth'
import { AuthContextType } from '../../types'
import * as ROUTES from "../../routes"

const AuthedLayout = () => {
  const { user } = useAuth() as AuthContextType
  const outlet = useOutlet()

  if (!user) {
    return <Navigate to={ROUTES.AUTH.SIGNIN} />
  }

  return <>{outlet}</>
}

export default AuthedLayout
