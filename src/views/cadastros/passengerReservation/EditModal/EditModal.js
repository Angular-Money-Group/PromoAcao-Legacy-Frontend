// ** Store & Actions
import { getData } from '../store/index'
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'
import { getDocument, getCountry, getState, getCruise, getInventory } from '../../../dashboard/reservas/store'

// ** Third Party Components
import Select from 'react-select'
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
import { selectThemeColors, axiosInstance as axios } from '@utils'

// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import '../styles.scss'

const defaultValues = {
  name: '',
  lastname: '',
  email: '',
  document_identification: '',
  document_id: '',
  phone_number: '',
  zip: '',
  public_place: '',
  address_number: '',
  city: '',
  neighborhood: '',
  // inventory_id: '',
  // cabin_category_id: '',
  // cruise_id: '',
  country_id: '',
  state_id: ''
  // price: ''
}

const EditModal = ({
  currentPage,
  rowsPerPage,
  searchValue
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.passengerReservationEditModal)
  const reservationId = editModalStore.reservationId
  const property = editModalStore.property
  const modalIsOpen = editModalStore.modalIsOpen

  const { id } = useParams()

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      reservationId
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
    getValues,
    watch,
    setValue
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data !== null) {
      axios.put(`/api/reservation/${id}`, {
        name: data?.name,
        lastname: data?.lastname,
        email: data?.email,
        document_identification: data?.document_identification,
        document_id: data?.document_id.value,
        phone_number: data?.phone_number,
        zip: data?.zip,
        public_place: data?.public_place,
        address_number: data?.address_number,
        city: data?.city,
        neighborhood: data?.neighborhood,
        inventory_id: data?.inventory_id,
        cabin_category_id: data?.cabin_category_id.value,
        cruise_id: data?.cruise_id.value,
        country_id: data?.country_id.value,
        state_id: data?.state_id.value,
        price: data?.price
      })
      .then(() => {
        console.log(data)
        handleEditModalOpen()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Reserva atualizada com sucesso!</h6>
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
              <Avatar size='sm' color='danger' icon={<X size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Houve algum problema ao editar a reserva. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }


  const [document, setDocument] = useState(null)
  const [country, setCountry] = useState(null)
  const [state, setState] = useState(null)
  const [cruise, setCruise] = useState(null)
  const [category, setCategory] = useState(null)
  const [fullCategories, setFullCategories] = useState([])

  useEffect(() => {
    getDocument()
      .then((result) => {
        const modifiedDocument = []
        result.data.map(document => {
          modifiedDocument.push({
            value: document.id, label: document.name
          })
        })
        setDocument(modifiedDocument)
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

  useEffect(() => {
    getCruise()
      .then((result) => {
        const modifiedCruise = []
        result.data.map(cruise => {
          modifiedCruise.push({
            value: cruise.id, label: cruise.name
          })
        })
        setCruise(modifiedCruise)
      })
  }, [])

  useEffect(() => {
    const cruise_id = getValues('cruise_id')

    if (cruise_id?.value) {
      axios.get(`/api/cruise/${cruise_id?.value}/category/precifications/`)
      .then((result) => {
        const modifiedCategory = []
        const categories = Object.values(result.data.data)
        categories.map(category => {
          modifiedCategory.push({
            value: category.cabin_category.id, label: category.cabin_category.name
          })
        })
        setFullCategories(categories)
        setCategory(modifiedCategory)
      })
    } else {
      setCategory([])
    }
  }, [watch('cruise_id')])

  useEffect(() => {
    const cabin_category_id = getValues('cabin_category_id')

    const price = fullCategories.find(c => c.cabin_category_id === cabin_category_id?.value)?.precification?.price

    if (cabin_category_id?.value) {
      getInventory(cabin_category_id?.value)
      .then((result) => {
        setValue('inventory_id', result.data[0]?.id)
        setValue('price', price)
      })
    }
  }, [watch('cabin_category_id')])

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', property?.name)
      setValue('lastname', property?.lastname)
      setValue('email', property?.email)
      setValue('document_identification', property?.document_identification)
      setValue('phone_number', property?.phone_number)
      setValue('zip', property?.zip)
      setValue('address_number', property?.address_number)
      setValue('city', property?.city)
      setValue('neighborhood', property?.neighborhood)
      setValue('public_place', property?.public_place)

      setValue('document_id', { value: (property?.document === null) ? '' : property?.document?.id, label:(property?.document === null) ? 'Sem propriedades registradas' : property?.document?.name })
      setValue('country_id', { value: property?.country?.id, label: property?.country?.name })
      setValue('state_id', { value: property?.state?.id, label: property?.state?.name })
      setValue('cabin_category_id', { value: property?.cabin_category?.id, label: property?.cabin_category?.name })
      setValue('cruise_id', { value: property?.cruise?.id, label: property?.cruise?.name })
    }
  }, [editModalStore])


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
          <h5 className='modal-title'>Editar Reserva</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>

           
            <div className='mb-1'>
              <Label className='form-label' for='name'>Primeiro nome</Label>
              <Controller
                defaultValue=''
                control={control}
                id='name'
                name='name'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='name'
                    placeholder='Primeiro nome'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='lastname'>Sobrenome</Label>
              <Controller
                defaultValue=''
                control={control}
                id='lastname'
                name='lastname'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='lastname'
                    placeholder='Sobrenome'
                  />
                )}
              />
            </div>
            
            <div className='mb-1'>
              <Label className='form-label' for='email'>E-mail</Label>
              <Controller
                defaultValue=''
                control={control}
                id='email'
                name='email'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='email'
                    placeholder='email@email.com'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='document_id'>
                Tipo de documento
              </Label>
              <Controller
                id='document_id'
                control={control}
                name='document_id'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={document}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    className='text-uppercase'
                    {...field}
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='document_identification'>Documento de identificação</Label>
              <Controller
                defaultValue=''
                control={control}
                id='document_identification'
                name='document_identification'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='document_identification'
                    placeholder='123.321.456-65'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='phone_number'>Número de celular</Label>
              <Controller
                defaultValue=''
                control={control}
                id='phone_number'
                name='phone_number'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='phone_number'
                    placeholder='(00) 91234-5678'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='country_id'>País</Label>
              <Controller
                id='country_id'
                control={control}
                name='country_id'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={country}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='state_id'>Estado</Label>
              <Controller
                id='state_id'
                control={control}
                name='state_id'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={state}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='zip'>CEP</Label>
              <Controller
                defaultValue=''
                control={control}
                id='zip'
                name='zip'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='zip'
                    placeholder='12345-000'
                  />
                )}
              />
          </div>

            <div className='mb-1'>
              <Label className='form-label' for='city'>Cidade</Label>
              <Controller
                defaultValue=''
                control={control}
                id='city'
                name='city'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='city'
                    placeholder='Campinas'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='neighborhood'>Bairro</Label>
              <Controller
                defaultValue=''
                control={control}
                id='neighborhood'
                name='neighborhood'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='neighborhood'
                    placeholder='Centro'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='public_place'>Complemento</Label>
              <Controller
                defaultValue=''
                control={control}
                id='public_place'
                name='public_place'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='public_place'
                    placeholder='Casa'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='address_number'>Número do endereço</Label>
              <Controller
                defaultValue=''
                control={control}
                id='address_number'
                name='address_number'
                render={({ field }) => (
                  <Input
                    {...field}
                    id='address_number'
                    placeholder='123'
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='cruise_id'>
                Cruzeiro
              </Label>
              <Controller
                id='cruise_id'
                name='cruise_id'
                control={control}
                render={({ field }) => (
                  <Select
                    isClearable
                    options={cruise}
                    ref={field.ref}
                    onChange={field.onChange}
                    classNamePrefix='select'
                    theme={selectThemeColors}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='mb-1'>
              <Label className='form-label' for='cabin_category_id'>
                Categoria de cabine
              </Label>
              <Controller
                id='cabin_category_id'
                control={control}
                name='cabin_category_id'
                render={({ field }) => (
                  <Select
                    isClearable
                    options={category}
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
