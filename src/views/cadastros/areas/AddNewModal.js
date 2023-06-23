// ** React Imports
import { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'

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
import './styles.scss'

const statusOptions = [
  { value: '0', label: 'Desabilitado' },
  { value: '1', label: 'Habilitado' }
]

const locationOptions = [
  { value: 'outside', label: 'Outside' },
  { value: 'inside', label: 'Inside' }
]

const defaultValues = {
  name: '',
  description: '',
  status: '',
  location: '',
  ship_id: ''
}

const AddNewModal = ({
  open,
  handleModal,
  reloadData
}) => {
  // ** State
  const [data, setData] = useState(null)

  // ** Custom close btn
  const CloseBtn = <X
    className='cursor-pointer'
    size={15}
    onClick={handleModal}
  />

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
  const { id } = useParams()

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.post('/api/areas', {
        name: data?.name,
        description: data?.description,
        status: data?.status?.value,
        location: data?.location?.value,
        ship_id: id
      }).then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Área de navio cadastrada com sucesso!</h6>
            </div>
          </div>
        )
        reloadData()
      })
    }
  }

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={handleModal}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>Adicionar Área</h5>
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
                      placeholder='Nova Área'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='description'>
                  Descrição
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='description'
                  name='description'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='description'
                      placeholder='Área VIP'
                      invalid={errors.description && true}
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
              <div className='mb-1'>
                <Label className='form-label' for='location'>
                  Localização
                </Label>
                <Controller
                  id='location'
                  control={control}
                  name='location'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      options={locationOptions}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.location === null })}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
          </Form>
          <div className='d-flex'>
            <Button className='me-1' color='primary' onClick={handleSubmit(onSubmit)}>
              Adicionar
            </Button>
            <Button color='primary' onClick={handleModal} outline>
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddNewModal
