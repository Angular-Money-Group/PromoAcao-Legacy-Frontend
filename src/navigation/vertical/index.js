// ** Navigation imports
import cadastros from './cadastros'
import pages from './pages'
import dashboards from './dashboards'
import configuracoes from './configuracoes'

// ** Merge & Export
export default [
  ...dashboards,
  ...cadastros,
  ...pages,
  ...configuracoes
]
