// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'

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
  { value: '0', label: 'Desabilitado' },
  { value: '1', label: 'Habilitado' }
]

const defaultValues = {
  name: '',
  departure_date: '',
  return_date: '',
  status: ''
}

const EditModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** State
  const [data, setData] = useState(null)

  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.cruisesEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const cruisesId = editModalStore.cruisesId
  const cruise = editModalStore.cruise

  // ** Hooks
  const {
   reset,
   control,
   setValue,
   handleSubmit,
   formState: { errors }
 } = useForm({ defaultValues })

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      cruisesId
    }))
  }

  // ** Custom close btn
  const CloseBtn = <X
      className='cursor-pointer'
      size={15}
      onClick={handleEditModalOpen}
    />

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      const departureDate = moment(data?.departure_date[0]).format('YYYY-MM-DD')
      const returnDate = moment(data?.return_date[0]).format('YYYY-MM-DD')
      
      axios.put(`/api/cruises/${cruisesId}`, {
        name: data?.name,
        departure_date: departureDate,
        return_date: returnDate,
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
              <h6 className='mb-0'>Destino atualizado com sucesso!</h6>
            </div>
          </div>
        )
        dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            name: searchValue
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
              <h6 className='mb-0'>Houve algum problema ao editar o destino. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    console.log(editModalStore)
    if (!editModalStore.isLoading) {
      setValue('name', cruise?.name)
      setValue('departure_date', cruise?.departure_date)
      setValue('return_date', cruise?.return_date)
      setValue('status', {
        value: cruise?.status,
        label: statusOptions[cruise?.status]?.label
      })
    }
  }, [editModalStore.isLoading])

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
          <h5 className='modal-title'>Editar Destino</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>
            <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Nome
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='name'
                  name='name'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='name'
                      placeholder='MSC Fantasia'
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                  <Label className='form-label' for='departure_date'>
                    Data de Saída
                  </Label>
                  <Controller
                    id='departure_date'
                    name='departure_date'
                    control={control}
                    render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='departure_date'
                      invalid={errors.name && true}
                    />
                    )}
                  />
                </div>

                <div className='mb-1'>
                  <Label className='form-label' for='return_date'>
                    Data de Retorno
                  </Label>
                  <Controller
                    id='return_date'
                    name='return_date'
                    control={control}
                    render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='return_date'
                      invalid={errors.name && true}
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
