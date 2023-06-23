// ** React Imports
import { lazy } from 'react'

const Cruzeiros = lazy(() => import('../../views/cadastros/cruzeiros'))
const Navios = lazy(() => import('../../views/cadastros/navios'))
const Decks = lazy(() => import('../../views/cadastros/decks'))
const Cabines = lazy(() => import('../../views/cadastros/cabines'))
const CabinCategories = lazy(() => import('../../views/cadastros/cabinCategories'))
const CabinProperties = lazy(() => import('../../views/cadastros/cabinProperties'))
const Areas = lazy(() => import('../../views/cadastros/areas'))
const Companhias = lazy(() => import('../../views/cadastros/companhias'))
const Destinos = lazy(() => import('../../views/cadastros/destinos'))
const Roteiros = lazy(() => import('../../views/cadastros/roteiros'))
const Portos = lazy(() => import('../../views/cadastros/portos'))
const Passageiros = lazy(() => import('../../views/cadastros/passageiros'))
const Inventarios = lazy(() => import('../../views/cadastros/inventario'))
const Preco = lazy(() => import('../../views/cadastros/preco'))
const AddPassengerInReservetion = lazy(() => import('../../views/cadastros/passengerReservation'))
const AnalyticsCruise = lazy(() => import('../../views/cadastros/analytics-cruise'))

const AppRoutes = [
  {
    element: <Cruzeiros />,
    path: '/cadastros/cruzeiros'
  },
  { 
    element: <Inventarios />,
    path: '/cadastros/cruzeiros/:cruiseId/:shipId/inventarios'
  },
  { 
    element: <AddPassengerInReservetion />,
    path: '/dashboard/reservas/:id/passenger'
  },
  { 
    element: <AnalyticsCruise />,
    path: '/cadastros/cruzeiros/:id/analytics'
  },
  { 
    element: <Preco />,
    path: '/cadastros/cruzeiros/:id/preco'
  },
  {
    element: <Navios />,
    path: '/cadastros/navios'
  },
  {
    element: <Decks />,
    path: '/cadastros/navios/:id/decks'
  },
  {
    element: <Cabines />,
    path: '/cadastros/navios/:id/cabines'
  },
  {
    element: <CabinCategories />,
    path: '/cadastros/navios/:id/cabin/categories'
  },
  {
    element: <CabinProperties />,
    path: '/cadastros/navios/:id/cabin/properties'
  },
  {
    element: <Areas />,
    path: '/cadastros/navios/:id/areas'
  },
  {
    element: <Companhias />,
    path: '/cadastros/companhias'
  },
  {
    element: <Passageiros />,
    path: '/cadastros/passageiros'
  },
  {
    element: <Destinos />,
    path: '/cadastros/destinos'
  },
  {
    element: <Roteiros />,
    path: '/cadastros/roteiros'
  },
  {
    element: <Portos />,
    path: '/cadastros/portos'
  }
]

export default AppRoutes
