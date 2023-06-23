// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ** Store & Actions
import { useSelector } from 'react-redux'

// ** Third Party Components
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import classnames from 'classnames'
import toast from 'react-hot-toast'
import { X, Check } from 'react-feather'
import { useDropzone } from 'react-dropzone'

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
  Form,
  FormFeedback,
  ListGroup,
  ListGroupItem
} from 'reactstrap'

// ** Utils
import { selectThemeColors, axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/file-uploader/file-uploader.scss'
import './styles.scss'

const defaultValues = {
  name: '',
  status: '',
  area_id: '',  
  image: '',  
  current_occupation: '',  
  ship_id: ''
}

const AddNewModal = ({
  open,
  handleModal,
  reloadData
}) => {
  // ** State
  const [data, setData] = useState(null)
  const [files, setFiles] = useState([])
  const [areas, setAreas] = useState(null)

  const { id } = useParams()
  
  const getAreaByShip = useSelector(state => state.cabinCategories)
  const areaId = getAreaByShip.areasId

  useEffect(() => {
    if (areaId !== null) {
      axios.get(`/api/ships/${id}/areas`)
      .then((result) => {
        const modifiedArea = []
        result.data.map(area => {
          modifiedArea.push({
            value: area.id, label: area.name
          })
        })
        setAreas(modifiedArea)
      })
    }
  }, [])

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
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (data !== null) {
      axios.post('/api/cabins/categories', {
        name: data?.name,
        area_id: data?.area_id.value,
        image: data?.image,
        status: data?.status?.value,
        current_occupation: data?.current_occupation,
        ship_id: id
      })
      .then(() => {
        handleModal()
        reset()
        setFiles([])
        toast(
          <div className='d-flex align-items-center'>
            <div className='me-1'>
              <Avatar size='sm' color='success' icon={<Check size={12} />} />
            </div>
            <div className='d-flex flex-column'>
              <h6 className='mb-0'>Categoria de cabine cadastrada com sucesso!</h6>
            </div>
          </div>
        )
        reloadData()
      })
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: acceptedFiles => {
      acceptedFiles.map(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          setValue('image', event.target.result)

          setFiles([...acceptedFiles.map(file => Object.assign(file))])
        }

        reader.readAsDataURL(file)
      })
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='18' />
    } else {
      return <FileText size='28' />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const renderFileSize = size => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    }
  }

  const fileList = files.map((file, index) => (
    <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
      <div className='file-details d-flex align-items-center'>
        <div className='file-preview me-1'>{renderFilePreview(file)}</div>
        <div>
          <p className='file-name mb-0'>{file.name}</p>
          <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        size='sm'
        color='danger'
        className='btn-icon'
        onClick={() => handleRemoveFile(file)}
        outline
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  ))

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
          <h5 className='modal-title'>Adicionar Categoria de Cabine</h5>
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
                      placeholder='Nova Categoria de Cabine'
                      invalid={errors.name && true}
                    />
                  )}
                />
                {errors?.name && <FormFeedback>{errors?.name?.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='current_occupation'>
                  Ocupação
                </Label>
                <Controller
                  defaultValue=''
                  control={control}
                  id='current_occupation'
                  name='current_occupation'
                  render={({ field }) => (
                    <Input
                      {...field}
                      id='current_occupation'
                      placeholder='Ocupação da cabine'
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='area_id'>
                  Área
                </Label>
                <Controller
                  id='area_id'
                  control={control}
                  name='area_id'
                  render={({ field }) => (
                    <Select
                      isClearable
                      placeholder='Selecione'
                      options={areas}
                      classNamePrefix='select'
                      theme={selectThemeColors}
                      className={
                        classnames('react-select', {
                          'is-invalid': data !== null && data.status === null
                        })
                      }
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='image'>
                  Imagem
                </Label>
                <div {...getRootProps({ className: 'dropzone' })} style={{ minHeight: '97px' }}>
                  <input {...getInputProps()} />
                  <div
                    className='p-3 d-flex text-align-center align-items-center justify-content-center flex-column'
                  >
                    <h6>Solte o arquivo aqui ou clique para fazer upload</h6>
                  </div>
                </div>
                {files.length ? (
                  <Fragment>
                    <ListGroup className='mt-2'>{fileList}</ListGroup>
                  </Fragment>
                ) : null}
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
                      className={
                        classnames('react-select', {
                          'is-invalid': data !== null && data.status === null
                        })
                      }
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
