// ** React Imports
import { Fragment, useState, useEffect, memo, forwardRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// ** Table Columns
import { columns } from './data'

// ** Store & Actions
import { getData } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Edit Modal Component
import EditModal from './EditModal/EditModal'

// ** Exclusion Modal Component
import ExclusionModal from './ExclusionModal/ExclusionModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Plus } from 'react-feather'
import DataTable from 'react-data-table-component'
import Spinner from '@components/spinner/Loading-spinner'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  Row,
  Col
} from 'reactstrap'

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className='form-check'>
    <Input type='checkbox' ref={ref} {...props} />
  </div>
))

const Decks = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.decks)

  // ** States
  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const initialItem = ((currentPage - 1) * rowsPerPage) + 1
  const lastItem = (((currentPage - 1) * rowsPerPage) + rowsPerPage) > store.total ? store.total : ((currentPage - 1) * rowsPerPage) + rowsPerPage

  // ** Vars
  const navigate = useNavigate()

  // ** Hooks
  const { id } = useParams()

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        shipId: id,
        name: searchValue,
        sortBy,
        sortOrder
      })
    )
  }, [dispatch])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        shipId: id,
        name: value,
        sortBy,
        sortOrder
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        shipId: id,
        name: searchValue,
        sortBy,
        sortOrder
      })
    )

    setCurrentPage(page.selected + 1)
  }

  // ** Function to handle per page
  const handlePerPage = e => {
    dispatch(
      getData({
        page: 1,
        perPage: parseInt(e.target.value),
        shipId: id,
        name: searchValue,
        sortBy,
        sortOrder
      })
    )

    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
  }

  const handleReturn = () => {
    navigate('/cadastros/navios')
  }

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage)

    return (
     <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
        <div style={{ marginLeft: '1rem' }}>
          Visualizando {lastItem === 0 ? 0 : initialItem} a {lastItem} de {store.total} registros
        </div>
        <ReactPaginate
          previousLabel={''}
          nextLabel={''}
          breakLabel='...'
          pageCount={Math.ceil(count) || 1}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          activeClassName='active'
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={page => handlePagination(page)}
          pageClassName='page-item'
          breakClassName='page-item'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          breakLinkClassName='page-link'
          previousLinkClassName='page-link'
          nextClassName='page-item next-item'
          previousClassName='page-item prev-item'
          containerClassName={
            'pagination react-paginate separated-pagination justify-content-end pe-1 mt-1'
          }
        />
     </div>
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      name: searchValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.data.slice(0, rowsPerPage)
    }
  }

  const sortPropertyName = (propertyName) => {
    switch (propertyName) {
      case "NOME":
        return "name"
      case "NAVIO":
        return "ship_id"
      case "STATUS":
        return "status"
      default:
        return ""
    }
  }

  const handleSort = (column, sortOrder) => {
    const propertyName = sortPropertyName(column?.name)
    setSortBy(propertyName)
    setSortOrder(sortOrder)

    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        shipId: id,
        name: searchValue,
        sortBy: propertyName,
        sortOrder
      })
    )
  }

  const reloadData = () => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        shipId: id,
        name: searchValue,
        sortBy,
        sortOrder
      })
    )
  }

  const customStyles = {
    headCells: {
      style: {
        paddingRight: '40px'
      }
    },
    cells: {
      style: {
        paddingRight: '40px'
      }
    }
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Decks</CardTitle>
          <div>
            <Button className='ms-2' color='dark' onClick={handleReturn}>
              <span className='align-middle'>Voltar</span>
            </Button>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Deck</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col sm='6'>
            <div className='d-flex align-items-center gap-1'>
              <Label for='sort-select'>Exibir</Label>
              <Input
                className='dataTable-select'
                type='select'
                id='sort-select'
                value={rowsPerPage}
                onChange={e => handlePerPage(e)}
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
              </Input>
            </div>
          </Col>
          <Col className='d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1' sm='6'>
            <Label className='me-1' for='search-input'>
              Buscar
            </Label>
            <Input
              className='dataTable-filter'
              type='text'
              bsSize='sm'
              id='search-input'
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div
          className='react-dataTable react-dataTable-selectable-rows'
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <DataTable
            noHeader
            pagination
            paginationServer
            sortServer
            selectableRows
            columns={columns}
            paginationPerPage={20}
            onSort={handleSort}
            className='react-dataTable'
            progressPending={store.isLoading}
            progressComponent={
              <p className='pt-2 pb-2'>
                <Spinner />
              </p>
            }
            noDataComponent={
              <p className='pt-2'>Não há registros para exibir</p>
            }
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            component
            paginationDefaultPage={currentPage + 1}
            selectableRowsComponent={BootstrapCheckbox}
            data={dataToRender()}
            customStyles={customStyles}
          />
        </div>
      </Card>

      <AddNewModal
        open={modal}
        handleModal={handleModal}
        reloadData={reloadData}
      />

      <EditModal
        reloadData={reloadData}
      />

      <ExclusionModal
        reloadData={reloadData}
      />
    </Fragment>
  )
}

export default memo(Decks)
