// ** Third Party Components
import { Edit } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, getInventory, handleEditModal } from './EditModal/store'

// ** Reactstrap Imports
import {
  Badge
} from 'reactstrap'

const status = {
  Indisponível: { title: 'Indisponível', color: 'light-danger' },
  Disponível: { title: 'Disponível', color: 'light-success' },
  Reservado: { title: 'Reservado', color: 'warning' }
}

export let data

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    minWidth: '200px',
    sortable: true,
    selector: row => row.cabin,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.cabin}</span>
      </div>
    )
  },
  {
    name: 'CRUZEIRO',
    grow: 3,
    sortable: true,
    selector: row => row.cruise.name
  },
  {
    name: 'CATEGORIA DA CABINE',
    grow: 3,
    sortable: true,
    selector: row => row.cabin_category.name
  },
  {
    name: 'OCUPAÇÃO MÁXIMA',
    grow: 3,
    sortable: true,
    selector: row => row.max_occupation
  },
  {
    name: 'STATUS',
    minWidth: '100px',
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
      const editModalStore = useSelector(state => state.inventoryEditModal)
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getInventory({
          inventoryId: row.id
        }))
        dispatch(getCategories(row?.cruise?.ship_id))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          inventoryId: row.id
        }))
      }

      return (
        <div className='d-flex gap-1'>
          <Edit
            size={16}
            style={{ cursor: 'pointer' }}
            onClick={handleEditModalOpen}
          />
        </div>
      )
    }
  }
]
