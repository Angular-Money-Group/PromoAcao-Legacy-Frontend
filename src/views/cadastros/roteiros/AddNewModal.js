// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useSelector } from 'react-redux'

// ** Third Party Components
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check, Delete, Plus } from 'react-feather'
import { ReactSortable } from 'react-sortablejs'
import { yupResolver } from '@hookform/resolvers/yup'
import Spinner from '@components/spinner/Loading-spinner'

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
  ListGroupItem,
  Form,
  FormFeedback
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/pages/page-form-validation.scss'
import './styles.scss'

const defaultValues = {
  name: '',
  destinations: ''
}

const AddNewModal = ({
  open,
  handleModal,
  reloadData
}) => {
  // ** State
  const [listArr, setListArr] = useState([])
  const [availableDestinations, setAvailableDestinations] = useState([])

  // ** Store Vars
  const store = useSelector(state => state.roteiros)

  // ** Custom close btn
  const CloseBtn = <X
    className='cursor-pointer'
    size={15}
    onClick={handleModal}
  />

  const ItenerarySchema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório')
  })

   // ** Hooks
   const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(ItenerarySchema) })

  const onSubmit = data => {
    const destinations = listArr?.map((d, index) => {
      return {
        id: d.id,
        sequence: index + 1
      }
    })

    if (data !== null) {
      axios.post('/api/itineraries', {
        name: data?.name,
        destinations
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

  useEffect(() => {
    setAvailableDestinations(store.destinations)
  }, [store.destinations])

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={handleModal}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        {!store.destinationsIsPending ? (
          <>
            <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
              <h5 className='modal-title'>Adicionar Roteiro</h5>
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
                    Adicionar
                  </Button>
                  <Button color='primary' onClick={handleModal} outline>
                    Cancelar
                  </Button>
                </div>
              </ModalBody>
          </>
        ) : (
          <p className='pt-2 pb-2'>
            <Spinner />
          </p>
        )}
      </Modal>
    </Fragment>
  )
}

export default AddNewModal
