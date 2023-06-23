// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { X, Check } from 'react-feather'
import Select from 'react-select'
import classnames from 'classnames'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody,
  Form
} from 'reactstrap'

// ** Utils
import { selectThemeColors, axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const statusOptions = [
  { value: "Indisponível", label: "Indisponível" },
  { value: "Disponível", label: "Disponível" },
  { value: "Reservado", label: "Reservado" }
]

const defaultValues = {
  cruise_id: '',
  cabin_category_id : '',
  status: ''
}

const EditModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.inventoryEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const inventoryId = editModalStore.inventoryId
  const shipCategoryId = editModalStore.shipCategoryId
  const inventory = editModalStore.inventory
  const categoriesStore = editModalStore?.categories

  const { id } = useParams()

  // ** State
  const [data, setData] = useState(null)
  const [categories, setCategories] = useState(null)

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      inventoryId,
      shipCategoryId
    }))
  }

  // ** Custom close btn
  const CloseBtn = <X
    className='cursor-pointer'
    size={15}
    onClick={handleEditModalOpen}
  />

  // ** Hooks
   const {
    reset,
    control,
    handleSubmit,
    setValue
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.put(`/api/inventories/${inventoryId}`, {
        cabin_category_id : data?.cabin_category_id.value,
        cruise_id: id,
        status: data?.status?.value
      })
      .then(() => {
        handleEditModalOpen()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Inventário atualizado com sucesso!</h6>
            </div>
          </div>
        )
        dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            name: searchValue,
            cruiseId: id
          })
        )
      })
      .catch(() => {
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='danger' icon={<X size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Houve algum problema ao editar o inventário. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('cabin_category_id', { value: inventory?.cabin_category.id, label: inventory?.cabin_category.name })
      setValue('status', { value: inventory?.status, label: statusOptions?.find(s => s.value === inventory?.status)?.label })
    }
  }, [editModalStore])

  useEffect(() => {
      setCategories(categoriesStore?.map(cabinCategories => {
        return {
          value: cabinCategories.id, label: cabinCategories.name
        }
      }))
  }, [categoriesStore])

  return (
    <Fragment>
      <Modal
        isOpen={modalIsOpen}
        toggle={handleEditModalOpen}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <ModalHeader className='mb-1' toggle={handleEditModalOpen} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>Editar Inventário</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>
              <div className='mb-1'>
              <Label className='form-label' for='cabin_category_id'>
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
                      placeholder='Selecione'
                      options={categories}
                      classNamePrefix='select'
                      className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
                      theme={selectThemeColors}
                      {...field}
                      />
                      )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='status'>
                  Status
                </Label>
                <Controller
                  id='status'
                  control={control}
                  name='status'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      options={statusOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </Form>
          <div className='d-flex'>
            <Button className='me-1' color='primary' onClick={handleSubmit(onSubmit)}>
              Atualizar
            </Button>
            <Button color='primary' onClick={handleEditModalOpen} outline>
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditModal
