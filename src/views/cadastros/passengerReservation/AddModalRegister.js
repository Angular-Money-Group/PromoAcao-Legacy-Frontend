// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { getData } from './store'
import { useDispatch } from 'react-redux'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'
import Select from 'react-select'

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
import { selectThemeColors, axiosInstance as axios } from '@utils'


// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import './styles.scss'

const defaultValues = {
  name: '',
  lastname: '',
  birthday: '',
  birthday_place: '',
  sex: '',
  document_identification: '',
  document_id: '',
  issue_date: '',
  expiration_date: '',
  zip: '',
  address: '',
  city: '',
  main_phone: '',
  emergency_phone: '',
  country_id: '',
  state_id: ''
}

const AddNewModalRegister = ({
  open,
  handleModalPassenger,
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
    onClick={handleModalPassenger}
  />

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit
    // formState: { errors }
  } = useForm({ defaultValues })
  const { id } = useParams()

  const onSubmit = data => {
    if (data !== null) {
      axios.post('/api/reservations/passengers', {
          reservation_id: id,
          passenger_id: data?.passenger_id.value
        }
      )
      .then(() => {
        handleModalPassenger()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Passageiro cadastrado na com sucesso!</h6>
            </div>
          </div>
        )
        dispatch(
          getData({
            page: currentPage,
            perPage: rowsPerPage,
            name: searchValue,
            reservationId: id
          })
        )
      })
      .catch((err) => {
        console.log(data)
        console.log(err)
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='md' color='danger' icon={<X size={16} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Houve algum problema ao inserir o passageiro. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  const [passengerExist, setPassengerExist] = useState(null)

  useEffect(() => {
    axios.get('/api/passenger')
      .then((result) => {
        const modifiedPassenger = []
        result.data.data.map(passenger => {
          modifiedPassenger.push({
            value: passenger.id, label: passenger.name
          })
        })
        setPassengerExist(modifiedPassenger)
      })
  }, [])

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={handleModalPassenger}
        className='sidebar-sm'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
      >
        <ModalHeader className='mb-1' toggle={handleModalPassenger} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>Adicionar Passageiro</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>

                <div className='mb-1'>
                <Label className='form-label' for='passenger_id'>
                  Passageiro
                </Label>
                <Controller
                  id='passenger_id'
                  control={control}
                  name='passenger_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      options={passengerExist}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      {...field}
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
            <Button color='primary' onClick={handleModalPassenger} outline>
              Cancelar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default AddNewModalRegister