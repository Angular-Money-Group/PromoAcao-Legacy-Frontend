// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import { getCompanies } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { handleEditModal } from './store'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
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

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const statusOptions = [
  { value: '0', label: 'Desabilitado' },
  { value: '1', label: 'Habilitado' }
]

const defaultValues = {
  name: '',
  company_id: '',
  status: ''
}

const EditModal = ({
  reloadData
}) => {
  // ** Store Vars
  const dispatch = useDispatch()
  const editModalStore = useSelector(state => state.shipEditModal)
  const modalIsOpen = editModalStore.modalIsOpen
  const shipId = editModalStore.shipId
  const ship = editModalStore.ship
  const company = editModalStore.company

  // ** State
  const [data, setData] = useState(null)
  const [companies, setCompanies] = useState(null)

  // ** Function to handle Edit Modal toggle
  const handleEditModalOpen = () => {
    dispatch(handleEditModal({
      onOpen: !modalIsOpen,
      shipId
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
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.put(`/api/ships/${shipId}`, {
        name: data?.name,
        status: data?.status?.value,
        company_id: data?.company_id?.value
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
              <h6 className='mb-0'>Navio atualizado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao editar o navio. Tente novamente!</h6>
            </div>
          </div>
        )
      })
    }
  }

  useEffect(() => {
    getCompanies()
      .then((result) => {
        const modifiedCompanies = []
        result.data.map(company => {
          modifiedCompanies.push({
            value: company.id, label: company.name
          })
        })
        setCompanies(modifiedCompanies)
      })
  }, [])

  useEffect(() => {
    if (!editModalStore.isLoading) {
      setValue('name', ship?.name)
      setValue('company_id', {
        value: company?.id,
        label: company?.name
      })
      setValue('status', {
        value: ship?.status,
        label: statusOptions[ship?.status]?.label
      })
    }
  }, [editModalStore.isLoading])

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
          <h5 className='modal-title'>Editar Navio</h5>
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
                      placeholder='MSC Fantasia'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='company_id'>
                  Companhia
                </Label>
                <Controller
                  id='company_id'
                  control={control}
                  name='company_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={companies}
                      placeholder='Selecione'
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.company_id === null })}
                      {...field}
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
