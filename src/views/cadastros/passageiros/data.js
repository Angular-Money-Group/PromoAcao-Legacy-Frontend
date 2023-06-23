// ** Third Party Components
import { Delete, Edit } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { handleEditModal, getPassenger } from './EditModal/store'

export let data

const nameFieldCaseInsensitiveSort = (a, b) => {
  return String(a.name).toLowerCase().localeCompare(String(b.name).toLowerCase())
}

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    grow: 3,
    sortable: true,
    selector: row => row.name,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name} {row.lastname}</span>
      </div>
    ),
    sortFunction: nameFieldCaseInsensitiveSort
  },
  {
    name: 'NUM. PARA CONTATO',
    grow: 3,
    sortable: true,
    selector: row => row.main_phone,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.main_phone}</span>
      </div>
    )
  },
  {
    name: 'TIPO DE DOCUMENTO',
    grow: 3,
    sortable: true,
    selector: row => row.document_id,
    cell: row => (
      <div className='user-info text-truncate'>
        <span style={{textTransform: 'uppercase'}} className='d-block fw-bold text-truncate'>{row.document.name}</span>
      </div>
    )
  },
  {
    name: 'DOCUMENTO',
    grow: 3,
    sortable: true,
    selector: row => row.document_identification,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.document_identification}</span>
      </div>
    )
  },
  {
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      const dispatch = useDispatch()
      const exclusionModalStore = useSelector(state => state.passengerExclusionModal)
      const editModalStore = useSelector(state => state.passengerEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          passengerId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getPassenger({
          passengerId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          passengerId: row.id
        }))
      }

      return (
        <div className='d-flex gap-1'>

          <Delete 
            size={15}
            style={{ cursor: 'pointer' }}
            onClick={handleExclusionModalOpen}
          />

          <Edit 
            size={15}
            style={{ cursor: 'pointer' }}
            onClick={handleEditModalOpen}
          />

      </div>
      )
    }
  }
]
