// ** Third Party Components
import { Edit, Delete } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { handleEditModal, getDecks } from './EditModal/store'

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
    minWidth: '250px',
    sortable: true,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name}</span>
      </div>
    )
  },
  {
    name: 'NAVIO',
    grow: 3,
    sortable: true,
    selector: row => row.ship_id
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
      const exclusionModalStore = useSelector(state => state.deckExclusionModal)
      const editModalStore = useSelector(state => state.deckEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          deckId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getDecks({
          deckId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          deckId: row.id
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
