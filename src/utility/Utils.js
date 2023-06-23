import { DefaultRoute } from '../router/routes'
import useJwt from '@src/auth/jwt/useJwt'
import axios from 'axios'

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 'admin') return DefaultRoute
  if (userRole === 'client') return '/reservas'
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#7367f01a', // for option hover bg-color
    primary: '#7367f0', // for selected option bg-color
    neutral10: '#7367f0', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

const HOST_API = process.env.REACT_APP_HOST_API_KEY || ''

// ** global axios instance
const axiosInstance = axios.create({
  baseURL: HOST_API
})

axiosInstance.interceptors.request.use(
  config => {
    // ** Get token from localStorage
    const accessToken = useJwt.getToken()

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${useJwt.jwtConfig.tokenType} ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

// ** setAuthHeaderAxios function to set the authorization header
const setAuthHeaderAxios = (accessToken) => {
  console.log(accessToken)
  if (accessToken) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export {
  axiosInstance,
  setAuthHeaderAxios
}
