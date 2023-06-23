// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import Select from 'react-select'
import { getShips, getPorts, getDestination, getData } from './store'
import { useDispatch } from 'react-redux'

// import Cleave from 'cleave.js/react'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'
import { Check, X } from 'react-feather'

import toast from 'react-hot-toast'

import moment from 'moment/moment'

import Avatar from '@components/avatar'

import { selectThemeColors, axiosInstance as axios } from '@utils'


// ** Reactstrap Imports
import {
  Modal,
  Input,
  Label,
  Button,
  ModalHeader,
  ModalBody
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import './styles.scss'

const statusOptions = [
  { value: '0', label: 'Desabilitado' },
  { value: '1', label: 'Habilitado' }
]

const defaultValues = {
  name: '',
  ship_id: '',
  port_id: '',
  destination_id: '',
  departure_date: '',
  return_date: '',
  status: ''
}

const AddNewModal = ({ 
  open, 
  handleModal,
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  const dispatch = useDispatch()
  // ** State
  const [data, setData] = useState(null)
  const [ships, setShips] = useState(null)
  const [ports, setPorts] = useState(null)
  const [destination, setDestination] = useState(null)

  // ** Custom close btn
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleModal} />

  const { id } = useParams()

  // ** Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ defaultValues })

  useEffect(() => {
    getShips()
      .then((result) => {
        const modifiedShips = []
        result.data.map(ships => {
          modifiedShips.push({
            value: ships.id, label: ships.name
          })
        })
        setShips(modifiedShips)
      })
  }, [])
  
  useEffect(() => {
    getPorts()
      .then((result) => {
        const modifiedPorts = []
        result.data.map(ports => {
          modifiedPorts.push({
            value: ports.id, label: ports.name
          })
        })
        setPorts(modifiedPorts)
      })
  }, [])

  useEffect(() => {
    getDestination()
      .then((result) => {
        const modifiedDestination = []
        result.data.map(destination => {
          modifiedDestination.push({
            value: destination.id, label: destination.city
          })
        })
        setDestination(modifiedDestination)
      })
  }, [])

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      const departureDate = moment(data?.departure_date[0]).format('YYYY-MM-DD')
      const returnDate = moment(data?.return_date[0]).format('YYYY-MM-DD')

      axios.post('/api/cruises', {
        name: data?.name,
        ship_id: data?.ship_id.value,
        port_id: data?.port_id.value,
        status: data?.status?.value,
        destination_id: data?.destination_id.value,
        departure_date: departureDate,
        return_date: returnDate
      }).then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Cruzeiro cadastrado com sucesso!</h6>
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

  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={handleModal}
        className='sidebar-lg'
        modalClassName='modal-slide-in'
        contentClassName='pt-0'
        style={{ width: '80%' }}
      >
        <ModalHeader className='mb-1' toggle={handleModal} close={CloseBtn} tag='div'>
          <h5 className='modal-title'>Adicionar Cruzeiro</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between cruzeiro-add-modal-content'>
          <div className='d-flex gap-4'>
            <div className='w-50 flex-column d-flex'>
              <div>
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
                      id='full-name'
                      placeholder='Energia na Veia'
                      invalid={errors.name && true}
                    />
                  )}
                />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='ship_id'>
                    Navio
                  </Label>
                  <Controller
                    id='ship_id'
                    control={control}
                    name='ship_id'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={ships}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.ship_id === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='port_id'>
                    Porto
                  </Label>
                  <Controller
                    id='port_id'
                    control={control}
                    name='port_id'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={ports}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.port_id === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='destination_id'>
                    Destino
                  </Label>
                  <Controller
                    id='destination_id'
                    name='destination_id'
                    control={control}
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={destination}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.destination_id === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='departure_date'>
                    Data de Saída
                  </Label>
                  <Controller
                    id='departure_date'
                    name='departure_date'
                    control={control}
                    render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='departure_date'
                      invalid={errors.name && true}
                    />
                    )}
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='return_date'>
                    Data de Retorno
                  </Label>
                  <Controller
                    id='return_date'
                    name='return_date'
                    control={control}
                    render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='return_date'
                      invalid={errors.name && true}
                    />
                    )}
                  />
                </div>
                <div className='mb-1'>
                  <Label className='form-label' for='full-name'>
                    Status
                  </Label>
                  <Controller
                    id='status'
                    control={control}
                    name='status'
                    render={({ field }) => (
                      <Select
                        isClearable
                        options={statusOptions}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.status === null })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
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
