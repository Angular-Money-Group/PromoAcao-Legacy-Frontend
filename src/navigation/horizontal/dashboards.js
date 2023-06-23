// ** Icons Import
import { Home, Activity } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home />,
    children: [
      {
        id: 'analyticsDash',
        title: 'Analytics',
        icon: <Activity />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'reservasDash',
        title: 'Reservas',
        navLink: '/dashboard/reservas'
      }
    ]
  }
]
