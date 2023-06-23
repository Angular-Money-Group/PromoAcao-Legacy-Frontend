// ** Third Party Components
import { Edit } from 'react-feather'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleEditModal, getPrice } from './EditModal/store'

export let data

// ** Table Common Column
export const columns = [
  {
    name: 'NOME',
    minWidth: '250px',
    sortable: true,
    selector: row => row.cabin_category.name,
    cell: row => (
      <div className='user-info text-truncate'>
        <span className='d-block fw-bold text-truncate'>{row.cabin_category.name}</span>
      </div>
    )
  },
  {
    name: 'PREÇO',
    grow: 3,
    sortable: true,
    selector: row => <span>{(row.precification === null) ? "Não há preços cadastrados" : row.precification.price}</span>
  },
  {
    name: 'TAXA',
    grow: 3,
    sortable: true,
    selector: row => <span>{(row.precification === null) ? "Não há taxas cadastradas" : row.precification.rate}</span>
  },
  {
    name: 'AÇÃO',
    allowOverflow: true,
    right: true,
    cell: (row) => {
      // ** Store Vars
      const dispatch = useDispatch()
      const editModalStore = useSelector(state => state.priceEditModal)
      const editModalIsOpen = editModalStore.modalIsOpen

      const handleEditModalOpen = e => {
        e.preventDefault()
        dispatch(getPrice({
          // priceId: row.precification.id,
          cruiseId: row.cruise_id,
          cabinCategoryId: row.cabin_category.id
        }))
        dispatch(handleEditModal({
          onOpen: !editModalIsOpen,
          // priceId: row.precification.id,
          cabinCategoryId: row.cabin_category.id
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
