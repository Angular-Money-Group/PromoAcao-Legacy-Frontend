// ** Icons Import
import { Edit, Circle, Grid } from 'react-feather'

export default [
  {
    id: 'formsAndTable',
    title: 'Forms & Tables',
    icon: <Edit />,
    children: [
      {
        id: 'dataTable',
        title: 'DataTable',
        icon: <Grid />,
        children: [
          {
            id: 'dtBasic',
            title: 'Basic',
            icon: <Circle />,
            navLink: '/datatables/basic'
          },
          {
            id: 'dtAdvance',
            title: 'Advanced',
            icon: <Circle />,
            navLink: '/datatables/advance'
          }
        ]
      }
    ]
  }
]
