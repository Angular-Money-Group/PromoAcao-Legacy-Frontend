// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
  FormFeedback
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './styles.scss'

const defaultValues = {
  name: '',
  email: '',
  password: '',
  role: ''
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

  const userSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    email: yup.string().required('O nome é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
    role: yup.string().required('O role é obrigatório')
  })

   // ** Hooks
   const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(userSchema) })

  const onSubmit = data => {
    // setData(data)
    if (data !== null) {
      axios.post('/api/users', {
        name: data?.name,
        email: data?.email,
        password: data?.password,
        role: data?.role
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
              <h6 className='mb-0'>Usuário cadastrada com sucesso!</h6>
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
                <h6 className='mb-0'>Esse nome de usuário já está em uso.</h6>
              </div>
            </div>
          )
        } else {
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='danger' icon={<X size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Houve algum problema ao inserir o usuário. Tente novamente!</h6>
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
          <h5 className='modal-title'>Adicionar Usuário</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
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
              {errors.name && <FormFeedback>{errors.name.message}</FormFeedback>}
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
                    placeholder='email@email.com'
                    invalid={errors.email && true}
                  />
                )}
              />
              {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
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
            <div className='mb-1'>
              <Label className='form-label' for='role'>
              Perfil do usuário
              </Label>
              <Controller
                defaultValue=''
                control={control}
                id='role'
                name='role'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='select'
                    id='role'
                    placeholder='MSC Fantasia'
                    invalid={errors.role && true}
                  >
                    <option value=''>Selecione um perfil</option>
                    <option value='Funcionario'>Funcionario</option>
                    <option value='Admin'>Admin</option>
                  </Input>
                )}
              />
              {errors.role && <FormFeedback>{errors.role.message}</FormFeedback>}
            </div>
          </div>
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
