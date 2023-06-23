// ** React Imports
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { getData } from './store'
import { useDispatch } from 'react-redux'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
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
  Form,
  FormFeedback
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import './styles.scss'

const defaultValues = {
  name: '',
  code: '',
  ship_id: ''
}

const AddNewModal = ({
  open,
  handleModal,
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** Custom close btn
  const CloseBtn = <X
    className='cursor-pointer'
    size={15}
    onClick={handleModal}
  />

  const CabinPropertiesSchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório'),
    code: yup.string().required('O código é obrigatório')
  })

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(CabinPropertiesSchema) })
  const { id } = useParams()

  const onSubmit = data => {
    if (data !== null) {
      axios.post('/api/cabins/properties/', {
        name: data?.name,
        code: data?.code,
        ship_id: id
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
              <h6 className='mb-0'>Propriedade de cabine cadastrada com sucesso!</h6>
            </div>
          </div>
        )
        dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            name: searchValue,
            shipId: id
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
              <h6 className='mb-0'>Houve algum problema ao inserir a propriedade da cabine. Tente novamente!</h6>
            </div>
          </div>
        )
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
          <h5 className='modal-title'>Adicionar Propriedade de Cabine</h5>
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
                      placeholder='Nova Propriedade de Cabine'
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='code'>
                  Código
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='code'
                  name='code'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='code'
                      placeholder='Nova Propriedade de Cabine'
                      invalid={errors.code && true}
                    />
                  )}
                />
                {errors?.code && <FormFeedback>{errors?.code?.message}</FormFeedback>}
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
