// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { getPrice, handleEditModal } from './store'
import { useParams } from 'react-router-dom'
import EditPrecificationSection from './components/EditPrecificationSection'

// ** Third Party Components
import Spinner from '@components/spinner/Loading-spinner'
import { useForm, Controller } from 'react-hook-form'
import { X, Check } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'

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
  cruise_id: '',
  cabin_category_id : '',
  name: '',
  price: '',
  storage: '',
  rate: '',
  start_date: '',
  end_date: ''
}

const PostModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.priceEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const priceId = editModalStore.priceId
  const cabinCategoryId = editModalStore.cabinCategoryId
  const precificationsStore = editModalStore.precifications

  // ** States
  const [precifications, setPrecifications] = useState([])
  const [loading, setLoading] = useState(false)

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      priceId,
      cabinCategoryId
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
    control,
    reset,
    handleSubmit
  } = useForm({ defaultValues })

  const { id } = useParams()

  const reloadPrecifications = () => {
    dispatch(getPrice({
      cruiseId: id,
      cabinCategoryId
    }))
  }

  const onSubmit = data => {
    if (data !== null) {
      const startDate = moment(data?.start_date[0]).format('YYYY-MM-DD')
      const endDate = moment(data?.end_date[0]).format('YYYY-MM-DD')

      axios.post(`/api/precifications`, {
        name: data?.name,
        price: data?.price,
        storage: data?.storage,
        rate: data?.rate,
        start_date: startDate,
        end_date: endDate,
        cruise_id: id,
        cabin_category_id: cabinCategoryId
      })
      .then(() => {
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Preço criado com sucesso!</h6>
            </div>
          </div>
        )
        setLoading(true)
        reloadPrecifications()
        dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            name: searchValue,
            cruiseId: id
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
              <h6 className='mb-0'>Houve algum problema ao adicionar a precificação. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    setPrecifications([])
    setPrecifications(precificationsStore)
  }, [precificationsStore])

  useEffect(() => {
    setLoading(false)
  }, [precifications])

  return (
    <Fragment>
      <Modal
        isOpen={modalIsOpen}
        toggle={handleEditModalOpen}
        className='sidebar-lg'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
        style={{ width: '85%' }}
      >
        <ModalHeader
          className='mb-1'
          toggle={handleEditModalOpen}
          close={CloseBtn}
          tag='div'
        >
          <h5 className='modal-title'>Editar Preço</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between gap-2'>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div className='d-flex align-items-end gap-1 flex-wrap'>
              <div>
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
                    />
                  )}
                />
              </div>

              <div>
                <Label className='form-label' for='start_date'>
                  Inicio
                </Label>
                <Controller
                  id='start_date'
                  name='start_date'
                  control={control}
                  render={({ field }) => (
                  <Flatpickr
                    id='start_date'
                    className='form-control'
                    style={{ width: "110px" }}
                    {...field}
                  />
                  )}
                />
              </div>

              <div>
                <Label className='form-label' for='end_date'>
                  Fim
                </Label>
                <Controller
                  id='end_date'
                  name='end_date'
                  control={control}
                  render={({ field }) => (
                  <Flatpickr
                    id='end_date'
                    className='form-control'
                    style={{ width: "110px" }}
                    {...field}
                  />
                  )}
                />
              </div>

              <div>
                <Label className='form-label' for='price'>
                   Preço
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='price'
                  name='price'
                  render={({ field }) => (
                    <Input
                      id='price'
                      style={{ width: "100px" }}
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <Label className='form-label' for='rate'>
                   Taxa
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='rate'
                  name='rate'
                  render={({ field }) => (
                    <Input
                      id='rate'
                      style={{ width: "100px" }}
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <Label className='form-label' for='storage'>
                   Disponibilidade
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='storage'
                  name='storage'
                  render={({ field }) => (
                    <Input
                      id='storage'
                      style={{ width: "100px" }}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='d-flex flex-column'>
                <Button className='me-1' style={{fontSize: 16, paddingLeft: '30px', paddingRight: '30px'}} color='success' onClick={handleSubmit(onSubmit)}>
                  Adicionar
                </Button>
              </div>
            </div>
            {loading ? (
              <Spinner />
            ) : (
              precifications?.map((precification) => {
                return (
                  <EditPrecificationSection key={precification.id} precification={{
                    price_id: precification.precification_id,
                    cruise_id: precification.cruise_id,
                    cabin_category_id : precification.cabin_category_id,
                    name: precification.precification?.name,
                    price: precification.precification?.price,
                    storage: precification.precification?.storage,
                    rate: precification.precification?.rate,
                    start_date: precification.precification?.start_date,
                    end_date: precification.precification?.end_date
                  }} setLoading={setLoading} />
                )
              })
            )}
          </Form>
          <div className='d-flex mt-5'>
            <Button color='primary' onClick={handleEditModalOpen} outline>
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default PostModal
