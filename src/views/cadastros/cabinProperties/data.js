// ** Third Party Components
import { Edit, Delete } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleExclusionModal } from './ExclusionModal/store'
import { getCabinsProperty, handleEditModal } from './EditModal/store'

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
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      // ** Store Vars
      const dispatch = useDispatch()
      const exclusionModalStore = useSelector(state => state.cabinPropertyExclusionModal)
      const editModalStore = useSelector(state => state.cabinPropertyEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          cabinPropertyId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getCabinsProperty({
          cabinPropertyId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          cabinPropertyId: row.id
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
