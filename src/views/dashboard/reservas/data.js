import moment from 'moment/moment'

import { Eye } from 'react-feather'

export let data

const nameFieldCaseInsensitiveSort = (a, b) => {
  return String(a.name).toLowerCase().localeCompare(String(b.name).toLowerCase())
}

const status = {
  'Reserva Confirmada': { title: 'Reserva Confirmada', color: 'light-success' },
  'Pré Reserva': { title: 'Pré-Reserva', color: 'light-warning' },
  Cancelado: { title: 'Cancelado', color: 'light-danger' }
}

// ** Reactstrap Imports
import {
  Badge
} from 'reactstrap'

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    minWidth: '100px',
    sortable: true,
    selector: ({ name, lastname }) => `${name} ${lastname}`,
    sortFunction: nameFieldCaseInsensitiveSort
  },
  {
    name: 'CRUZEIRO',
    sortable: true,
    minWidth: '150px',
    selector: row => row.cruise.name
  },
  {
    name: 'INVENTÁRIO',
    sortable: true,
    minWidth: '420px',
    selector: row => `${row.inventory.cabin} | ${row.cabin_category.name}`
  },
  {
    name: 'DATA',
    sortable: true,
    minWidth: '100px',
    selector: (row) =>  moment(row.created_at).format('DD/MM/YYYY')
  },
  {
    name: 'STATUS',
    minWidth: '100px',
    sortable: true,
    selector: row => {
      console.log(row.status)
      return (
        status[row?.status]?.title
      )
    },
    cell: row => {
      return (
        <Badge color={status[row?.status]?.color} pill>
          {status[row?.status]?.title}
        </Badge>
      )
    }
  },
  {
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      return (
        <div className='d-flex'>
          <a
            href={`/dashboard/reservas/${row.id}/passenger`}
            className='w-100'
          >
            <Eye 
              size={20}
              style={{ cursor: 'pointer' }}
            />
          </a>
        </div>
      )
    }
  }
]
