// ** Icons Import
import {
  Unlock,
  Circle,
  FileText
} from 'react-feather'

export default [
  {
    id: 'pages',
    title: 'Pages',
    icon: <FileText />,
    children: [
      {
        id: 'authentication',
        title: 'Authentication',
        icon: <Unlock />,
        children: [
          {
            id: 'verify-email',
            title: 'Reset Password',
            icon: <Circle size={12} />,
            children: [
              {
                id: 'verify-email-basic',
                title: 'Basic',
                permissions: ['admin', 'editor'],
                navLink: '/pages/verify-email-basic',
                newTab: true
              },
              {
                id: 'verify-email-cover',
                title: 'Cover',
                permissions: ['admin', 'editor'],
                navLink: '/pages/verify-email-cover',
                newTab: true
              }
            ]
          }
        ]
      }
    ]
  }
]
