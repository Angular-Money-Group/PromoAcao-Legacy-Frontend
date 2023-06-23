// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
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
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  name: ''
}

const EditModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.cabinPropertyEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const cabinPropertyId = editModalStore.cabinPropertyId
  const cabinProperty = editModalStore.cabin_property

  const { id } = useParams()

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      cabinPropertyId
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
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data !== null) {
      axios.put(`/api/cabins/properties/${cabinPropertyId}`, {
        name: data?.name
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
              <h6 className='mb-0'>Propriedade de cabine atualizado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao editar a propriedade de cabine. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', cabinProperty?.name)
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
          <h5 className='modal-title'>Editar propriedade de cabine</h5>
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
