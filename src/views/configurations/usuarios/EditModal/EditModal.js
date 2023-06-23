// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

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
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  name: '',
  email: '',
  password: ''
}

const EditModal = ({
  reloadData
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.userEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const userId = editModalStore.userId
  const user = editModalStore.user

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      userId
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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data !== null) {
      axios.put(`/api/users/${userId}`, {
        name: data?.name,
        email: data?.email,
        password: data?.password
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
              <h6 className='mb-0'>Usuário atualizado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao editar o usuário. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', user?.name)
      setValue('email', user?.email)
      setValue('password', user?.password)
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
          <h5 className='modal-title'>Editar Usuário</h5>
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
                      placeholder='Nome do Usuário'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='email'>
                  E-mail
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='email'
                  name='email'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='email'
                      placeholder='Email do Usuário'
                      invalid={errors.email && true}
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
              <Label className='form-label' for='password'>
                Senha
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='password'
                name='password'
                render={({ field }) => (
                  <InputPasswordToggle
                    {...field}
                    id='password'
                    placeholder='****'
                    invalid={errors.password && true}
                  />
                )}
              />
              {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
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
