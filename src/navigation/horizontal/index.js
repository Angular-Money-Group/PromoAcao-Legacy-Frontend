// ** Navigation imports
import cadastros from './cadastros'
import pages from './pages'
import dashboards from './dashboards'
import formsAndTables from './forms-tables'
import configuracoes from './configuracoes'

// ** Merge & Export
export default [
  ...dashboards,
  ...cadastros,
  ...formsAndTables,
  ...pages,
  ...configuracoes
]
