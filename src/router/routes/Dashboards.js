import { lazy } from 'react'

const DashboardAnalytics = lazy(() => import('../../views/dashboard/analytics'))
const DashboardReservas = lazy(() => import('../../views/dashboard/reservas'))

const DashboardRoutes = [
  {
    path: '/dashboard/analytics',
    element: <DashboardAnalytics />
  },
  {
    path: '/dashboard/reservas',
    element: <DashboardReservas />
  }
]

export default DashboardRoutes
