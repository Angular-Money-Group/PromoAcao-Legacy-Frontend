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
  reloadData
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.deckEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const deckId = editModalStore.deckId
  const deck = editModalStore.deck

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      deckId
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
      axios.put(`/api/decks/${deckId}`, {
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
              <h6 className='mb-0'>Destino atualizado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao editar o destino. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', deck?.name)
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
          <h5 className='modal-title'>Editar Deck</h5>
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
