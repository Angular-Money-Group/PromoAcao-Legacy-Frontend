// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Store & Actions
import Select from 'react-select'
import { getCompanies } from './store'

// ** Third Party Components
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
import './styles.scss'

const statusOptions = [
  { value: '0', label: 'Desabilitado' },
  { value: '1', label: 'Habilitado' }
]

const defaultValues = {
  name: '',
  companhia: '',
  status: ''
}

const AddNewModal = ({
  open,
  handleModal,
  reloadData
  // currentPage,
  // rowsPerPage,
  // searchValue
}) => {
  // ** State
  const [data, setData] = useState(null)
  const [companies, setCompanies] = useState(null)

  // ** Custom close btn
  const CloseBtn = <X
      className='cursor-pointer'
      size={15}
      onClick={handleModal}
    />

   // ** Hooks
   const {
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.post('/api/ships', {
        name: data?.name,
        status: data?.status?.value,
        company_id: data?.companhia?.value
      }).then(() => {
        handleModal()
        reset()
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Navio cadastrado com sucesso!</h6>
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
              <h6 className='mb-0'>Houve algum problema ao inserir o navio. Tente novamente!</h6>
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
          <h5 className='modal-title'>Navio</h5>
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
                      placeholder='Nome do Usuário'
                      invalid={errors.name && true}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='post'>
                  Companhia
                </Label>
                <Controller
                  id='companhia'
                  control={control}
                  name='companhia'
                  render={({ field }) => (
                    <Select
                      isClearable
                      options={companies}
                      placeholder='Selecione'
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.companhia === null })}
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
