// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { handleExclusionModal } from './store'
import { getData } from '../store'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Custom Components
import Avatar from '@components/avatar'
import { Check } from 'react-feather'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Modal,
  Button,
  ModalBody,
  ModalHeader
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

const defaultValues = {
  cardNumber: ''
}

const ExclusionModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const exclusionModalStore = useSelector(state => state.cabinPropertyExclusionModal)
  const modalIsOpen = exclusionModalStore.modalIsOpen
  const cabinPropertyId = exclusionModalStore.cabinPropertyId
  
  const { id } = useParams()

  // ** States
  const [show, setShow] = useState(modalIsOpen)

  // ** Hooks
  const {
    handleSubmit,
    reset
  } = useForm({ defaultValues })

  const onSubmit = () => {
    if (cabinPropertyId !== null) {
      axios.delete(`/api/cabins/properties/${cabinPropertyId}`)
        .then(() => {
          setShow(!show)
          reset()
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Destino excluído com sucesso!</h6>
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
    }
  }

  useEffect(() => {
    dispatch(handleExclusionModal({
      onOpen: show,
      cabinPropertyId
    }))
  }, [show])

  useEffect(() => {
    setShow(modalIsOpen)
  }, [modalIsOpen])

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>Tem certeza que deseja excluir?</h1>
          <Row tag='form' className='gy-1 gx-2 mt-75' onSubmit={handleSubmit(onSubmit)}>
            <Col className='text-center mt-3' xs={12}>
              <Button type='submit' className='me-1' color='primary'>
                Excluir
              </Button>
              <Button
                color='primary'
                outline
                onClick={() => {
                  setShow(!show)
                }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ExclusionModal
