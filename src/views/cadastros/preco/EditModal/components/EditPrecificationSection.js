// ** Store & Actions
import { useDispatch } from 'react-redux'
import { getPrice } from '../store'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import { X, Check } from 'react-feather'
import toast from 'react-hot-toast'
import Flatpickr from 'react-flatpickr'
import moment from 'moment/moment'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Input,
  Label,
  Button
} from 'reactstrap'

// ** Utils
import { axiosInstance as axios } from '@utils'

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss'

const EditPrecificationSection = ({
  precification,
  setLoading
}) => {
  // ** Store Vars
  const dispatch = useDispatch()

  const defaultValues = {
    cruise_id: precification.cruise_id,
    cabin_category_id: precification.cabin_category_id,
    name: precification.name,
    price: precification.price,
    storage: precification.storage,
    rate: precification.rate,
    start_date: [precification.start_date],
    end_date: [precification.end_date]
  }

  const reloadPrecifications = () => {
    dispatch(getPrice({
      cruiseId: precification.cruise_id,
      cabinCategoryId: precification.cabin_category_id
    }))
  }

  const {
    control,
    reset,
    handleSubmit
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (data !== null) {
      const startDate = moment(data?.start_date[0]).format('YYYY-MM-DD')
      const endDate = moment(data?.end_date[0]).format('YYYY-MM-DD')

      axios.put(`/api/precifications/${precification.price_id}`, {
        name: data?.name,
        price: data?.price,
        storage: data?.storage,
        rate: data?.rate,
        start_date: startDate,
        end_date: endDate,
        cruise_id: precification.cruise_id,
        cabin_category_id: precification.cabin_category_id
      })
        .then(() => {
          reset()
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='success' icon={<Check size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Preço atualizado com sucesso!</h6>
              </div>
            </div>
          )
          reloadPrecifications()
          setLoading(true)
        })
        .catch(() => {
          toast(
            <div className='d-flex align-items-center'>
              <div className='me-1'>
                <Avatar size='sm' color='danger' icon={<X size={12} />} />
              </div>
              <div className='d-flex flex-column'>
                <h6 className='mb-0'>Houve algum problema ao atualizar a precificação. Tente novamente!</h6>
              </div>
            </div>
          )
        })
    }
  }

  return (
    <div className='d-flex align-items-end gap-1 flex-wrap' >
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
              onChange={(value) => {
                field.onChange(value)
              }}
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
        <Button className='me-1' style={{ fontSize: 16, paddingLeft: '30px', paddingRight: '30px' }} color='success' onClick={handleSubmit(onSubmit)}>
          Atualizar
        </Button>
      </div>
    </div>
  )
}

export default EditPrecificationSection
