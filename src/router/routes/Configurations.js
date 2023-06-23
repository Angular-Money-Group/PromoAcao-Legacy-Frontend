import { lazy } from 'react'

const Usuarios = lazy(() => import('../../views/configurations/usuarios'))

const ConfigurationsRoutes = [
  {
    path: '/configuracoes/usuarios',
    element: <Usuarios />
  }
]

export default ConfigurationsRoutes
