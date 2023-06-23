// ** Third Party Components
import { MoreVertical, Edit, Delete } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { handleEditModal, getDestination } from './EditModal/store'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'

export let data

const cityFieldCaseInsensitiveSort = (a, b) => {
  return String(a.city).toLowerCase().localeCompare(String(b.city).toLowerCase())
}

const countryFieldCaseInsensitiveSort = (a, b) => {
  return String(a.country).toLowerCase().localeCompare(String(b.country).toLowerCase())
}

const stateFieldCaseInsensitiveSort = (a, b) => {
  return String(a.state).toLowerCase().localeCompare(String(b.state).toLowerCase())
}

// ** Table Common Column
export const columns = [
  {
    name: 'PAÍS',
    grow: 3,
    sortable: true,
    selector: row => row.country,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.country}</span>
      </div>
    ),
    sortFunction: countryFieldCaseInsensitiveSort
  },
  {
    name: 'ESTADO',
    grow: 3,
    sortable: true,
    selector: row => row.state,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.state}</span>
      </div>
    ),
    sortFunction: stateFieldCaseInsensitiveSort
  },
  {
    name: 'CIDADE',
    grow: 3,
    sortable: true,
    selector: row => row.city,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.city}</span>
      </div>
    ),
    sortFunction: cityFieldCaseInsensitiveSort
  },
  {
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      // ** Store Vars
      const dispatch = useDispatch()
      const exclusionModalStore = useSelector(state => state.destinationExclusionModal)
      const editModalStore = useSelector(state => state.destinationEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          destinationId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getDestination({
          destinationId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          destinationId: row.id
        }))
      }

      return (
        <div className='d-flex'>
          <UncontrolledDropdown>
            <DropdownToggle
              tag='span'
              className='pe-1'
              style={{ cursor: 'pointer' }}
            >
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleEditModalOpen}
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Editar destino</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleExclusionModalOpen}
              >
                <Delete size={15} />
                <span className='align-middle ms-50'>Excluir destino</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
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
