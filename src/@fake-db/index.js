import mock from './mock'

import './jwt'
import './select'
import './apps/userList'
import './navios/navios'
import './companhias/companhias'
import './destinos/destinos'
import './pages/pricing-data'
import './navbar/navbarSearch'
import './apps/permissionsList'
import './cards/card-analytics'
import './cards/card-statistics'
import './pages/account-settings'
import './autoComplete/autoComplete'

mock.onAny().passThrough()
