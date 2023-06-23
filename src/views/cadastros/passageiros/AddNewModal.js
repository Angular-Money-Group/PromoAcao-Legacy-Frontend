// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import { getDocuments, getCountry, getState } from './store'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, AlertTriangle } from 'react-feather'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'

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

  const sexOptions = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Feminino' }
  ]

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit
    // formState: { errors }
  } = useForm({ defaultValues })
  const [data, setData] = useState(null)

  const onSubmit = data => {
    setData(data)
    
    const birthday_date = moment(data?.birthday[0]).format('YYYY-MM-DD')
    const expiration = moment(data?.expiration_date[0]).format('YYYY-MM-DD')
    const expirationActually = `${expiration} 00:00:00`
    const insue = moment(data?.insue_date).format('YYYY-MM-DD')
    const insueActually = `${insue} 00:00:00 `

    if (data !== null) {
      axios.post('/api/passenger', 
      [
        {
        name: data?.name,
        lastname: data?.lastname,
        birthday: birthday_date,
        gender: data?.gender.value,
        issue_date: insueActually,
        birthday_place: data?.birthday_place,
        expiration_date: expirationActually,
        zip: data?.zip,
        address: data?.address,
        city: data?.city,
        main_phone: data?.main_phone,
        emergency_phone: data?.emergency_phone,
        country_id: data?.country_id.value,
        state_id: data?.state_id.value,
        document_identification: data?.document_identification,
        document_id: data?.document_id.value,
        reservation_id: data?.reservation_id
      }
    ]
      )
      .then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<AlertTriangle size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Passageiro cadastrado com sucesso!</h6>
            </div>
          </div>
        )
        reloadData()
      })
      .catch(() => {
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

  const [documents, setDocuments] = useState(null)
  const [state, setState] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    getDocuments()
      .then((result) => {
        const modifiedDocuments = []
        result.data.map(document => {
          modifiedDocuments.push({
            value: document.id, label: document.name
          })
        })
        setDocuments(modifiedDocuments)
      })
  }, [])
  useEffect(() => {
    getCountry()
      .then((result) => {
        const modifiedCountry = []
        result.data.map(country => {
          modifiedCountry.push({
            value: country.id, label: country.name
          })
        })
        setCountry(modifiedCountry)
      })
  }, [])

  useEffect(() => {
    getState()
      .then((result) => {
        const modifiedState = []
        result.data.map(state => {
          modifiedState.push({
            value: state.id, label: state.name
          })
        })
        setState(modifiedState)
      })
  }, [])

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
          <h5 className='modal-title'>Adicionar Passageiro</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>

            <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Primeiro nome
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
                      placeholder='Primeiro nome do Passageiro'
                    />
                  )}
                />
              </div>
            <div className='mb-1'>
                <Label className='form-label' for='lastname'>
                  Sobrenome
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='lastname'
                  name='lastname'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='lastname'
                      placeholder='Sobrenome do Passageiro'
                    />
                  )}
                />
              </div>

              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='gender'>
                    Genero
                </Label>
                <Controller
                    id='gender'
                    control={control}
                    name='gender'
                    render={({ field }) => (
                      <Select
                      isClearable
                      placeholder='Selecione'
                      classNamePrefix='select'
                      options={sexOptions}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
                      theme={selectThemeColors}
                      {...field}
                      />
                      )}
                />
              </div>

              <div className='mb-1'>
                  <Label className='form-label' for='birthday'>
                    Data de aniversario
                  </Label>
                  <Controller
                    id='birthday'
                    name='birthday'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='birthday'
                      placeholder='01/01/2001'
                    />
                    )}
                  />
              </div>

            <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='birthday_place'>
                  Local de nascimento
                </Label>
                <Controller
                  control={control}
                  id='birthday_place'
                  name='birthday_place'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='birthday_place'
                      placeholder='São Paulo'
                    />
                  )}
                />
              </div>

                <div className='mb-1'>
                <Label className='form-label' for='document_id'>
                  Tipo de Documento
                </Label>
                <Controller
                  id='document_id'
                  control={control}
                  name='document_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      options={documents}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='document_identification'>
                    Documento de identificação
                </Label>
                <Controller
                    id='document_identification'
                    control={control}
                    name='document_identification'
                    render={({ field }) => (
                      <Input
                        {...field}
                        id='document_identification'
                      />
                    )}
                  />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='issue_date'>
                  Data de emissão
                </Label>
                <Controller
                  id='issue_date'
                  control={control}
                  name='issue_date'
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='issue_date'
                      placeholder='03/03/2023'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='expiration_date'>
                  Data de expiração
                </Label>
                <Controller
                  id='expiration_date'
                  control={control}
                  name='expiration_date'
                  render={({ field }) => (
                    <Flatpickr
                      {...field}
                      className='form-control'
                      id='expiration_date'
                      placeholder='03/03/2023'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='zip'>
                  CEP
                </Label>
                <Controller
                  id='zip'
                  control={control}
                  name='zip'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='zip'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='address'>
                  Endereço
                </Label>
                <Controller
                  id='address'
                  control={control}
                  name='address'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='address'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='city'>
                  Cidade
                </Label>
                <Controller
                  id='city'
                  control={control}
                  name='city'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='city'
                    />
                  )}
                />
              </div>
              
              <div className='mb-1'>
                <Label className='form-label' for='main_phone'>
                  Telefone principal
                </Label>
                <Controller
                  id='main_phone'
                  control={control}
                  name='main_phone'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='main_phone'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='emergency_phone'>
                  Telefone de emergencia
                </Label>
                <Controller
                  id='emergency_phone'
                  control={control}
                  name='emergency_phone'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='emergency_phone'
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='country_id'>
                  País
                </Label>
                <Controller
                  id='country_id'
                  control={control}
                  name='country_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      options={country}
                      {...field}
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='state_id'>
                  Estado
                </Label>
                <Controller
                  id='state_id'
                  control={control}
                  name='state_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      options={state}
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