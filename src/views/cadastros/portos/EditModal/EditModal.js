// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'

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
  country: '',
  state: '',
  city: '',
  status: ''
}

const EditModal = ({
  reloadData
}) => {
  // ** State
  const [data, setData] = useState(null)

  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.portEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const portId = editModalStore.portId
  const port = editModalStore.port

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
      portId
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
      axios.put(`/api/ports/${portId}`, {
        name: data?.name,
        country: data?.country,
        state: data?.state,
        city: data?.city,
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
                <h6 className='mb-0'>Porto atualizado com sucesso!</h6>
              </div>
            </div>
          )
          reloadData()
        })
        .catch(() => {
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='danger' icon={<X size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Houve algum problema ao editar o porto. Tente novamente!</h6>
              </div>
            </div>
          )
        })
    }
  }

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', port?.name)
      setValue('country', port?.country)
      setValue('state', port?.state)
      setValue('city', port?.city)
      setValue('status', {
        value: port?.status,
        label: statusOptions[port?.status]?.label
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
          <h5 className='modal-title'>Editar Porto</h5>
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
                      placeholder='Santos / Florianópolis / Santos'
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='country'>
                  País
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='country'
                  name='country'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='country'
                      placeholder='Estados Unidos'
                      invalid={errors.country && true}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='state'>
                  Estado
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='state'
                  name='state'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='state'
                      placeholder='Flórida'
                      invalid={errors.costateuntry && true}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='city'>
                  Cidade
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='city'
                  name='city'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='city'
                      placeholder='Miami'
                      invalid={errors.city && true}
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
