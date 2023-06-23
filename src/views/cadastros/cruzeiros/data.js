// ** Third Party Components
import { Edit } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getCruises, handleEditModal } from './EditModal/store'

import { FaBed } from 'react-icons/fa'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { TbDeviceDesktopAnalytics } from 'react-icons/tb'

// ** Reactstrap Imports
import {
  Badge,
  DropdownItem
} from 'reactstrap'

const status = {
  0: { title: 'Desabilitado', color: 'light-danger' },
  1: { title: 'Habilitado', color: 'light-success' }
}

export let data

const nameFieldCaseInsensitiveSort = (a, b) => {
  return String(a.name.toLowerCase()).localeCompare(String(b.name).toLowerCase())
}

const departureDateFieldCaseInsensitiveSort = (a, b) => {
  return String(a.departure_date).toLowerCase().localeCompare(String(b.departure_date).toLowerCase())
}

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    minWidth: '280px',
    sortable: true,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name}</span>
      </div>
    ),
    sortFunction: nameFieldCaseInsensitiveSort
  },
  {
    name: 'NAVIO',
    sortable: true,
    minWidth: '280px',
    selector: row => row.ship.name
  },
  {
    name: 'DATA SAÍDA',
    sortable: true,
    minWidth: '150px',
    selector: row => row.departure_date,
    sortFunction: departureDateFieldCaseInsensitiveSort
  },
  {
    name: 'STATUS',
    minWidth: '180px',
    sortable: true,
    selector: row => {
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
      // ** Store Vars
      const dispatch = useDispatch()
      const editModalStore = useSelector(state => state.cruisesEditModal)
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getCruises({
          cruisesId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          cruisesId: row.id
        }))
      }

      return (
        <div className="d-flex gap-1">
          <a href={`/cadastros/cruzeiros/${row.id}/${row.ship_id}/inventarios`}>
            <FaBed color='#000' size={25} style={{ cursor: "pointer" }} />
          </a>
          <a href={`/cadastros/cruzeiros/${row.id}/preco`}>
            <RiMoneyDollarCircleLine color='#000' size={25} style={{ cursor: "pointer" }} />
          </a>
          <a href={`/cadastros/cruzeiros/${row.id}/analytics`}>
            <TbDeviceDesktopAnalytics color='#000' size={25} style={{ cursor: "pointer" }} />
          </a>
          <Edit
            size={20}
            style={{ cursor: "pointer" }}
            onClick={handleEditModalOpen}
          />
        </div>
      )
    }
  }
]
