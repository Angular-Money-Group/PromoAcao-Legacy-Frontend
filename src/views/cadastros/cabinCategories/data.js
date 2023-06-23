// ** Third Party Components
import { Edit, Delete } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { getCategories, handleEditModal } from './EditModal/store'

// ** Reactstrap Imports
import {
  Badge
} from 'reactstrap'

const status = {
  0: { title: 'Desabilitado', color: 'light-danger' },
  1: { title: 'Habilitado', color: 'light-success' }
}

export let data

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    grow: 3,
    sortable: row => row.name,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name}</span>
      </div>
    )
  },
  {
    name: 'AREA',
    grow: 3,
    sortable: true,
    selector: row => row.area.name
    },
  {
    name: 'NAVIO',
    grow: 3,
    sortable: true,
    selector: row => row.ship.name
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
      const exclusionModalStore = useSelector(state => state.cabinCategoriesExclusionModal)
      const editModalStore = useSelector(state => state.categoriesEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          categoriesId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getCategories({
          categoriesId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          categoriesId: row.id
        }))
      }

      return (
        <div className='d-flex gap-1'> 
          <Delete 
            size={18} 
            style={{ cursor: 'pointer' }}
            onClick={handleExclusionModalOpen}
          />
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
