// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'
import { useParams } from 'react-router-dom'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'
import Select from 'react-select'
import classnames from 'classnames'

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

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const defaultValues = {
  name: '',
  max_occupation: '',
  cabin_property_id: '',
  cabin_category_id: '',
  deck_id: '',
  partner_code: '',
  status: ''
}

const EditModal = ({
  reloadData
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.cabinsEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const cabinsId = editModalStore.cabinsId
  const cabins = editModalStore.cabins

  const { id } = useParams()

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      cabinsId
    }))
  }

  const statusOptions = [
    { value: '0', label: 'Desabilitado' },
    { value: '1', label: 'Habilitado' }
  ]

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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const [data, setData] = useState(null)

  const getDecksByShip = useSelector(state => state.cabinsByShip)
  const cabinCategoriesId = getDecksByShip.cabinCategoriesId

  const decksId = getDecksByShip.decksId

  const cabinPropertiesId = getDecksByShip.cabinPropertiesId

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.put(`/api/cabins/${cabinsId}`, {
        name: data?.name,
        max_occupation: data?.max_occupation,
        cabin_property_id: (data?.cabin_property_id === "") ? null : data?.cabin_property_id.value,
        cabin_category_id: data?.cabin_category_id.value,
        partner_code: data?.partner_code,
        status: data?.status?.value,
        deck_id: data?.deck_id.value,
        ship_id: id
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

  const [decks, setDecks] = useState(null)
  const [categories, setCategories] = useState(null)
  const [properties, setProperties] = useState(null)

  useEffect(() => {
        if (decksId !== null) {
          axios.get(`/api/ships/${id}/decks`)
          .then((result) => {
            const modifiedDecks = []
            result.data.map(deck => {
              modifiedDecks.push({
                value: deck.id, label: deck.name
              })
            })
            setDecks(modifiedDecks)
          })
        }

        if (cabinPropertiesId !== null) {
          axios.get(`/api/ships/${id}/cabin/properties`)
            .then((result) => {
              const modifiedProperties = []
              result.data.map(cabinProperties => {
                modifiedProperties.push({
                  value: cabinProperties.id, label: cabinProperties.name
                })
              })
              setProperties(modifiedProperties)
            })
        } 

        if (cabinCategoriesId !== null) {
          axios.get(`/api/ships/${id}/cabin/categories`)
            .then((result) => {
              const modifiedCategories = []
              result.data.data.map(cabinCategories => {
                modifiedCategories.push({
                  value: cabinCategories.id, label: cabinCategories.name
                })
              })
              setCategories(modifiedCategories)
            })
        } 
  }, [])
  
  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', cabins?.name)
      setValue('max_occupation', cabins?.max_occupation)
      setValue('partner_code', cabins?.partner_code)
      setValue('status', { value: cabins?.status, label: statusOptions[cabins?.status]?.label })

      setValue('cabin_property_id', { value: (cabins?.cabin_property === null) ? '' : cabins?.cabin_property?.id, label:(cabins?.cabin_property === null) ? 'Sem propriedades registradas' : cabins?.cabin_property?.name })
      setValue('cabin_category_id', { value: cabins?.cabin_category.id, label: cabins?.cabin_category.name })
      setValue('deck_id', { value: cabins?.deck.id, label: cabins?.deck?.name })
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
          <h5 className='modal-title'>Editar Destino</h5>
        </ModalHeader>
        <ModalBody className='flex-grow-1 d-flex flex-column justify-content-between'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className='d-flex flex-column'>

            <div className='mb-1'>
                <Label className='form-label' for='name'>
                  Cabine
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
                      placeholder='Nova Cabine'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='max_occupation'>
                  Ocupação Máxima
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='max_occupation'
                  name='max_occupation'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='max_occupation'
                      invalid={errors.name && true}
                    />
                  )}
                />
            </div>

            <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='cabin_property_id'>
                  Propriedade da Cabine
                </Label>
                <Controller
                  id='cabin_property_id'
                  control={control}
                  name='cabin_property_id'
                  render={({ field }) => (
                      <Select
                        id='cabin_property_id'
                        isClearable
                        placeholder='Selecione'
                        options={properties}
                        onClick={() => errorToast()}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.cabin_property_id === null })}
                        classNamePrefix='select'
                        theme={selectThemeColors}
                        {...field}
                        />
                  )}
                />
              </div>

              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='deck_id'>
                    Deck
                </Label>
                <Controller
                    id='deck_id'
                    control={control}
                    name='deck_id'
                    render={({ field }) => (
                      <Select
                      isClearable
                      placeholder='Selecione'
                      options={decks}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.deck_id === null })}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      {...field}
                      />
                      )}
                  />
                </div>

              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='cabin_category_id'>
                    Categoria
                </Label>
                <Controller
                    id='cabin_category_id'
                    control={control}
                    name='cabin_category_id'
                    render={({ field }) => (
                      <Select
                      isClearable
                      placeholder='Selecione'
                      options={categories}
                      classNamePrefix='select'
                      className={classnames('react-select', { 'is-invalid': data !== null && data.cabin_category_id === null })}
                      theme={selectThemeColors}
                      {...field}
                      />
                      )}
                />
              </div>

              <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='partner_code'>
                    Código do parceiro
                </Label>
                <Controller
                    id='partner_code'
                    control={control}
                    name='partner_code'
                    render={({ field }) => (
                      <Input
                      {...field}
                      id='partner_code'
                      />
                    )}
                  />
              </div>

              <div className='mb-1'>
                <Label className='form-label' for='status'>
                  Status
                </Label>
                <Controller
                  id='status'
                  control={control}
                  name='status'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
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
