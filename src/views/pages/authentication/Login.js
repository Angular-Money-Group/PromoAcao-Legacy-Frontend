// ** React Imports
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import useJwt from '@src/auth/jwt/useJwt'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Coffee, X } from 'react-feather'

// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser, setAuthHeaderAxios } from '@utils'

// ** Reactstrap Imports
import { Form, Input, Label, Button, Card, CardBody } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>Você se conectou com sucesso como um usuário {role}</span>
      </div>
    </div>
  )
}

const Login = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      useJwt
        .login({ email: data.loginEmail, password: data.password })
        .then(res => {
          const data = {
            ...res.data,
            accessToken: res.data.access_token,
            role: 'admin',
            ability: [
              {
                action: 'manage',
                subject: 'all'
              }
            ]
          }
          dispatch(handleLogin(data))
          setAuthHeaderAxios(data.accessToken)
          ability.update(data.ability)
          navigate(getHomeRouteForLoggedInUser(data.role))
          toast(t => (
            <ToastContent t={t} role={data?.role || 'admin'} name={data?.user?.name || ''} />
          ))
        })
        .catch(err => console.log(err))
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
              <h2 className='brand-text text-primary ms-1'>Promoação</h2>
            </Link>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  E-mail
                </Label>
                <Controller
                  id='loginEmail'
                  name='loginEmail'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='email'
                      id='login-email'
                      placeholder='email@promoacao.com.br'
                      invalid={errors.loginEmail && true}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='password'>
                    Senha
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Esqueceu a senha?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Permanecer conectado
                </Label>
              </div>
              <Button onClick={handleSubmit(onSubmit)} color='primary' block>
                Entrar
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Login
