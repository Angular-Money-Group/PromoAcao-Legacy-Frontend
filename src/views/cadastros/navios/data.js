// ** Third Party Components
import { MoreVertical, Edit, Delete } from 'react-feather'

// ** Store & Actions
import { handleExclusionModal } from './ExclusionModal/store'
import { useSelector, useDispatch } from 'react-redux'
import { getShip, handleEditModal } from './EditModal/store'

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

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    minWidth: '250px',
    sortable: true,
    selector: row => row.name,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.name}</span>
      </div>
    )
  },
  {
    name: 'COMPANHIA',
    sortable: true,
    selector: row => row.company.name
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
      const exclusionModalStore = useSelector(state => state.shipExclusionModal)
      const modalIsOpen = exclusionModalStore.modalIsOpen

      const handleExclusionModalOpen = e => {
        e.preventDefault()
        dispatch(handleExclusionModal({
          onOpen: !modalIsOpen,
          shipId: row.id
        }))
      }

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getShip({
          shipId: row.id
        }))
        dispatch(handleEditModal({
          onOpen: !modalIsOpen,
          shipId: row.id
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
            <DropdownMenu end style={{ height: '160px', overflowY: 'scroll' }}>
              <DropdownItem
                tag='a'
                href={`/cadastros/navios/${row.id}/cabines`}
                className='w-100'
                // onClick={handleCabinChangeModalOpen}
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Cabines</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href={`/cadastros/navios/${row.id}/decks`}
                className='w-100'
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Decks</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href={`/cadastros/navios/${row.id}/cabin/categories`}
                className='w-100'
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Categorias</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href={`/cadastros/navios/${row.id}/cabin/properties`}
                className='w-100'
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Propriedade de Cabine</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href={`/cadastros/navios/${row.id}/areas`}
                className='w-100'
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Área</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleEditModalOpen}
              >
                <Edit size={15} />
                <span className='align-middle ms-50'>Editar navio</span>
              </DropdownItem>
              <DropdownItem
                tag='a'
                href='/'
                className='w-100'
                onClick={handleExclusionModalOpen}
              >
                <Delete size={15} />
                <span className='align-middle ms-50'>Excluir navio</span>
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
