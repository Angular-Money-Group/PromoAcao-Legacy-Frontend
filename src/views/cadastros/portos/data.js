// ** Third Party Components
import { MoreVertical, Edit, Delete } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { getPort, handleEditModal } from './EditModal/store'
import { handleExclusionModal } from './ExclusionModal/store'

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
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

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    grow: 3,
    sortable: true,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name}</span>
      </div>
    ),
    sortFunction: nameFieldCaseInsensitiveSort
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
      const exclusionModalStore = useSelector(state => state.portExclusionModal)
      const editModalStore = useSelector(state => state.portEditModal)
      const exclusionModalIsOpen = exclusionModalStore.modalIsOpen
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !exclusionModalIsOpen,
          portId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getPort({
          portId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          portId: row.id
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
                <span className='align-middle ms-50'>Editar porto</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleExclusionModalOpen}
              >
                <Delete size={15} />
                <span className='align-middle ms-50'>Excluir porto</span>
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
