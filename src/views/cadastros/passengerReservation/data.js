import { Edit, Delete } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleEditPassengerModal, getPassenger } from './storePassenger.js'
import { handleExclusionModal } from './ExclusionModal/store'

export let data

const nameFieldCaseInsensitiveSort = (a, b) => {
  return String(a.name.toLowerCase()).localeCompare(String(b.name).toLowerCase())
}

// ** Table Common Column
export const columns = [
  {
    name: 'PASSAGEIROS',
    minWidth: '250px',
    sortable: true,
    cell: (row) => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.passenger.name} {row.passenger.lastname}</span>
      </div>
    ),
    sortFunction: nameFieldCaseInsensitiveSort
  },
  {
    name: 'DOCUMENTO',
    minWidth: '250px',
    sortable: true,
    cell: (row) => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.passenger.document_identification}</span>
      </div>
    )
  },
  {
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      const dispatch = useDispatch()
      const editModalStore = useSelector(state => state.reservationEditPassengerModal)
      const exclusionModalStore = useSelector(state => state.cabinsExclusionModal)
      
      const editModalIsOpen = editModalStore.modalIsOpen
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen


      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          passengerId: row.id
        }))
      }

      const handleEditPassengerModalOpen = e => {
        e.preventDefault()
        dispatch(getPassenger({
          passengerId: row.passenger.id,
          reservationId: row.id
        }))
        dispatch(handleEditPassengerModal({
          onOpen: !editModalIsOpen,
          passengerId: row.passenger.id,
          reservationId: row.id
        }))
      }


      return (
        <div className='d-flex gap-1'>

          <Edit 
            size={15}
            style={{ cursor: 'pointer' }}
            onClick={handleEditPassengerModalOpen}
          />

          <Delete 
            size={15}
            style={{ cursor: 'pointer' }}
            onClick={handleExclusionModalOpen}
          />

      </div>
      )
    }
  }
]