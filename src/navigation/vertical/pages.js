// ** Icons Import
import { Circle, UserCheck } from 'react-feather'

export default [
  {
    id: 'authentication',
    title: 'Authentication',
    icon: <UserCheck size={20} />,
    children: [
      {
        id: 'forgot-password',
        title: 'Forgot Password',
        icon: <Circle size={12} />,
        children: []
      }
    ]
  }
]
