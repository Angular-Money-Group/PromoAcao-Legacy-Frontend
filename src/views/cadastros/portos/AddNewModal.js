// ** React Imports
import { Fragment, useState } from 'react'

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
import {
  selectThemeColors,
  axiosInstance as axios
} from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './styles.scss'

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

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.post('/api/ports', {
        name: data?.name,
        country: data?.country,
        state: data?.state,
        city: data?.city,
        status: data?.status?.value
      })
      .then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Porto cadastrado com sucesso!</h6>
            </div>
          </div>
        )
        reloadData()
      })
      .catch(error => {
        if (error?.message === 'The name has already been taken.') {
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='danger' icon={<X size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Esse nome de porto já está em uso.</h6>
              </div>
            </div>
          )
        }
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
          <h5 className='modal-title'>Adicionar Porto</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form>
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
            <Button
              className='me-1'
              color='primary'
              onClick={handleSubmit(onSubmit)}
            >
              Adicionar
            </Button>
            <Button
              color='primary'
              onClick={handleModal}
              outline
            >
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddNewModal
