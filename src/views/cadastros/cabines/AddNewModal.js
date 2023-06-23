// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector } from 'react-redux'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { X, AlertTriangle } from 'react-feather'
import classnames from 'classnames'

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
  max_occupation: '',
  cabin_property_id: '',
  cabin_category_id: '',
  deck_id: '',
  partner_code: '',
  status: ''
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

  const statusOptions = [
    { value: '0', label: 'Desabilitado' },
    { value: '1', label: 'Habilitado' }
  ]

  // ** Hooks
  const {
    reset,
    control,
    handleSubmit
  } = useForm({ defaultValues })
  
  const { id } = useParams()
  const [data, setData] = useState(null)

  const getDecksByShip = useSelector(state => state.cabinsByShip)
  const cabinCategoriesId = getDecksByShip.cabinCategoriesId

  const decksId = getDecksByShip.decksId

  const cabinPropertiesId = getDecksByShip.cabinPropertiesId

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.post('/api/cabins', {
        name: data?.name,
        max_occupation: data?.max_occupation,
        cabin_property_id: data?.cabin_property_id?.value,
        cabin_category_id: data?.cabin_category_id?.value,
        partner_code: data?.partner_code,
        status: data?.status?.value,
        deck_id: data?.deck_id?.value,
        ship_id: id
      })
      .then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<AlertTriangle size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Cabine cadastrada com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao inserir a cabine. Tente novamente!</h6>
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
  }, [])

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
          <h5 className='modal-title'>Adicionar Cabine</h5>
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
                      // invalid={errors.name && true}
                    />
                  )}
                />
                {/* {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>} */}
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
                      // invalid={errors.name && true}
                    />
                  )}
                />
            </div>

            <div className='mb-1 d-flex flex-column'>
                <Label className='form-label' for='cabin_property_id'>
                  Propriedade da Cabine
                </Label>
                <Controller
                  control={control}
                  id='cabin_property_id'
                  name='cabin_property_id'
                  render={({ field }) => (
                      <Select
                        id='cabin_property_id'
                        isClearable
                        placeholder='Selecione'
                        options={properties}
                        onClick={() => errorToast()}
                        className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
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
                      className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
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
                      className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
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
                      id='max_occupation'
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
