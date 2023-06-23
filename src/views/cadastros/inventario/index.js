// ** React Imports
import { Fragment, useState, useEffect, memo, forwardRef } from 'react'
import { useParams } from 'react-router-dom'

// ** Table Columns
import { columns } from './data'

// ** Store & Actions
import { getData, getCategories, getProperties } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Edit Modal Component
import EditModal from './EditModal/EditModal'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown } from 'react-feather'
import DataTable from 'react-data-table-component'
import Spinner from '@components/spinner/Loading-spinner'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Utils
import { selectThemeColors, axiosInstance as axios } from '@utils'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
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

const statusOptions = [
  { value: 'Disponível', label: 'Disponível' },
  { value: 'Reservado', label: 'Reservado' },
  { value: 'Indisponível', label: 'Indisponível' }
]

const defaultValues = {
  cabin_category_id: '',
  cabin_property_id: '',
  status: ''
}

const Inventarios = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.inventario)

  // ** States
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)
  const [searchValue, setSearchValue] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [sortOrder, setSortOrder] = useState('asc')
  const [categories, setCategories] = useState(null)
  const [properties, setProperties] = useState(null)
  const initialItem = ((currentPage - 1) * rowsPerPage) + 1
  const lastItem = (((currentPage - 1) * rowsPerPage) + rowsPerPage) > store.total ? store.total : ((currentPage - 1) * rowsPerPage) + rowsPerPage

  const filterSchema = yup.object().shape({
    cabin_category_id: yup.string(),
    cabin_property_id: yup.string(),
    status: yup.string()
  })

  // ** Hooks
  const { cruiseId, shipId } = useParams()
  const {
    control,
    watch
  } = useForm({ defaultValues, resolver: yupResolver(filterSchema) })

  const cabin_category_id = watch('cabin_category_id')?.value
  const cabin_property_id = watch('cabin_property_id')?.value
  const status = watch('status')?.value

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        cruiseId,
        name: searchValue,
        sortBy,
        sortOrder,
        cabin_category_id,
        cabin_property_id,
        status
      })
    )
    dispatch(
      getCategories({
        shipId
      })
    )
    dispatch(
      getProperties({
        shipId
      })
    )
  }, [dispatch])

  useEffect(() => {
    axios.get()
  }, [])

  // ** Function to handle filter
  const handleFilter = e => {
    const value = e.target.value
    setSearchValue(value)
    setCurrentPage(1)

    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        cruiseId,
        name: value,
        sortBy,
        sortOrder,
        cabin_category_id,
        cabin_property_id,
        status
      })
    )
  }

  // ** Function to handle Pagination and get data
  const handlePagination = page => {
    dispatch(
      getData({
        page: page.selected + 1,
        perPage: rowsPerPage,
        cruiseId,
        name: searchValue,
        sortBy,
        sortOrder,
        cabin_category_id,
        cabin_property_id,
        status
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
        cruiseId,
        name: searchValue,
        sortBy,
        sortOrder
      })
    )

    setCurrentPage(1)
    setRowsPerPage(parseInt(e.target.value))
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
        return "cabin"
      case "CRUZEIRO":
        return "cruise_name"
      case "CATEGORIA DA CABINE":
        return "cabin_category_name"
      case "OCUPAÇÃO MÁXIMA":
        return "max_occupation"
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
        cruiseId,
        name: searchValue,
        sortBy: propertyName,
        sortOrder
      })
    )
  }

  useEffect(() => {
    const modifiedCategories = []
    store.categories.map(categorie => {
      modifiedCategories.push({
        value: categorie.id, label: categorie.name
      })
    })

    setCategories(modifiedCategories)
  }, [store.categories])

  useEffect(() => {
    const modifiedProperties = []
    store.properties.map(propertie => {
      modifiedProperties.push({
        value: propertie.id, label: propertie.name
      })
    })

    setProperties(modifiedProperties)
  }, [store.properties])

  useEffect(() => {
    setCurrentPage(1)
    dispatch(
      getData({
        page: 1,
        perPage: rowsPerPage,
        cruiseId,
        name: searchValue,
        sortBy,
        sortOrder,
        cabin_category_id,
        cabin_property_id,
        status
      })
    )
  }, [cabin_category_id, cabin_property_id, status])

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
          <CardTitle tag='h4'>Inventários</CardTitle>
        </CardHeader>
        <Row className='mx-0 mt-1 mb-50'>
          <Col className='d-flex justify-content-sm-end mt-sm-0 mt-1 flex-column' sm='4'>
            <Label className='me-1'>
              Categoria
            </Label>
            <Controller
              id='cabin_category_id'
              defaultValue=''
              control={control}
              name='cabin_category_id'
              render={({ field }) => (
                <Select
                  isClearable
                  options={categories}
                  placeholder='Selecione'
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  {...field}
                />
              )}
            />
          </Col>

          <Col className='d-flex justify-content-sm-end mt-sm-0 mt-1 flex-column' sm='4'>
            <Label className='me-1'>
              Propriedade
            </Label>
            <Controller
              id='cabin_property_id'
              defaultValue=''
              control={control}
              name='cabin_property_id'
              render={({ field }) => (
                <Select
                  isClearable
                  options={properties}
                  placeholder='Selecione'
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  {...field}
                />
              )}
            />
          </Col>

          <Col className='d-flex justify-content-sm-end mt-sm-0 mt-1 flex-column' sm='4'>
            <Label className='me-1'>
              Status
            </Label>
            <Controller
              id='status'
              defaultValue=''
              control={control}
              name='status'
              render={({ field }) => (
                <Select
                  isClearable
                  options={statusOptions}
                  placeholder='Selecione'
                  classNamePrefix='select'
                  theme={selectThemeColors}
                  {...field}
                />
              )}
            />
          </Col>

        </Row>
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

      <EditModal
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />
      
    </Fragment>
  )
}

export default memo(Inventarios)
