// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { X, Check } from 'react-feather'
import toast from 'react-hot-toast'

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
  axiosInstance as axios
} from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './styles.scss'

const defaultValues = {
  country: '',
  state: '',
  city: ''
}

const AddNewModal = ({
  open,
  handleModal,
  reloadData
}) => {
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
    if (data !== null) {
      axios.post('/api/destinations', {
        country: data?.country,
        state: data?.state,
        city: data?.city
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
              <h6 className='mb-0'>Destino cadastrado com sucesso!</h6>
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
          <h5 className='modal-title'>Adicionar Destino</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form>
            <div className='d-flex flex-column'>
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
                      invalid={errors.state && true}
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
