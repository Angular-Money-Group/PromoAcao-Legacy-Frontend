// ** Third Party Components
import { MoreVertical, Edit, Delete } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, handleEditModal } from './EditModal/store'

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
  return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
}

const emailFieldCaseInsensitiveSort = (a, b) => {
  return a.email.toLowerCase().localeCompare(b.email.toLowerCase())
}

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
    ),
    sortFunction: nameFieldCaseInsensitiveSort
  },
  {
    name: 'E-MAIL',
    grow: 3,
    sortable: row => row.email,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.email}</span>
      </div>
    ),
    sortFunction: emailFieldCaseInsensitiveSort
  },
  {
    // name: 'STATUS',
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
      const exclusionModalStore = useSelector(state => state.userExclusionModal)
      const modalIsOpen = exclusionModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !modalIsOpen,
          userId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getUser({
          userId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !modalIsOpen,
          userId: row.id
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
                <span className='align-middle ms-50'>Editar usuário</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleExclusionModalOpen}
              >
                <Delete size={15} />
                <span className='align-middle ms-50'>Excluir usuário</span>
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
