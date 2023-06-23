// ** React Imports
import { Fragment, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check, Delete, Plus } from 'react-feather'
import { ReactSortable } from 'react-sortablejs'

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
  ListGroupItem
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  name: '',
  destinations: ''
}

const EditModal = ({
  reloadData
}) => {
  // ** State
  const [listArr, setListArr] = useState([])
  const [availableDestinations, setAvailableDestinations] = useState([])

  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.itineraryEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const itineraryId = editModalStore.itineraryId

   // ** Hooks
   const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    reset()
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      itineraryId
    }))
  }

  // ** Custom close btn
  const CloseBtn = <X
    className='cursor-pointer'
    size={15}
    onClick={handleEditModalOpen}
  />

  const onSubmit = data => {
    const destinations = listArr?.map((d, index) => {
      return {
        id: d.id,
        sequence: index + 1
      }
    })

    if (data !== null) {
      axios.put(`/api/itineraries/${itineraryId}`, {
        name: data?.name,
        destinations
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
              <h6 className='mb-0'>Roteiro atualizado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao editar o roteiro. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  const removeDestination = (key) => {
    const element = listArr.find(el => el.id === key)

    setListArr(listArr.filter(d => d.id !== element.id))
    setAvailableDestinations([
      ...availableDestinations,
      element
    ])
  }

  const addDestination = (key) => {
    const element = availableDestinations.find(el => el.id === key)

    setAvailableDestinations(availableDestinations.filter(d => d.id !== element.id))
    setListArr([
      ...listArr,
      element
    ])
  }

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
          <h5 className='modal-title'>Editar Roteiro</h5>
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
                      invalid={errors?.name && true}
                    />
                  )}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Roteiro
                </Label>
                <ReactSortable
                  ag='ul'
                  className='list-group'
                  list={listArr}
                  setList={setListArr}
                  animation={200}
                >
                  {listArr?.map(item => {
                    return (
                      <ListGroupItem className='draggable' key={item.id}>
                        <div className='d-flex align-items-center justify-content-between'>
                          <h5 className='mb-0'>
                            {item.city}/{item.country}
                          </h5>
                          <a className='mb-0' onClick={(e) => e.preventDefault()}>
                            <Delete onClick={() => removeDestination(item.id)} />
                          </a>
                        </div>
                      </ListGroupItem>
                    )
                  })}
                </ReactSortable>
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Destinos disponíveis
                </Label>
                <ReactSortable
                  ag='ul'
                  className='list-group'
                  list={availableDestinations}
                  setList={setAvailableDestinations}
                  disabled
                >
                  {availableDestinations?.map(item => {
                    return (
                      <ListGroupItem className='draggable' key={item.id}>
                        <div className='d-flex align-items-center justify-content-between'>
                          <h5 className='mb-0'>
                            {item.city}/{item.country}
                          </h5>
                          <a className='mb-0' onClick={(e) => e.preventDefault()}>
                            <Plus onClick={() => addDestination(item.id)} />
                          </a>
                        </div>
                      </ListGroupItem>
                    )
                  })}
                </ReactSortable>
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
