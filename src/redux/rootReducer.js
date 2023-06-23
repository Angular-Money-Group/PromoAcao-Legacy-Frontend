// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import cabinChange from './cabinChange'
import auth from './authentication'
import dataTables from '@src/views/tables/data-tables/store'
import cruises from '@src/views/cadastros/cruzeiros/store'
import navios from '@src/views/cadastros/navios/store'
import shipEditModal from '@src/views/cadastros/navios/EditModal/store'
import shipExclusionModal from '@src/views/cadastros/navios/ExclusionModal/store'
import decks from '@src/views/cadastros/decks/store'
import cabinCategories from '@src/views/cadastros/cabinCategories/store'
import cabinProperties from '@src/views/cadastros/cabinProperties/store'
import cabinsByShip from '@src/views/cadastros/cabines/store'
import areas from '@src/views/cadastros/areas/store'
import companhias from '@src/views/cadastros/companhias/store'
import companyEditModal from '@src/views/cadastros/companhias/EditModal/store'
import companyExclusionModal from '@src/views/cadastros/companhias/ExclusionModal/store'
import cruisesEditModal from '@src/views/cadastros/cruzeiros/EditModal/store'
import categoriesEditModal from '@src/views/cadastros/cabinCategories/EditModal/store'
import cabinCategoriesExclusionModal from '@src/views/cadastros/cabinCategories/ExclusionModal/store'
import destinos from '@src/views/cadastros/destinos/store'
import destinationEditModal from '@src/views/cadastros/destinos/EditModal/store'
import destinationExclusionModal from '@src/views/cadastros/destinos/ExclusionModal/store'
import cabinPropertyEditModal from '@src/views/cadastros/cabinProperties/EditModal/store'
import cabinPropertyExclusionModal from '@src/views/cadastros/cabinProperties/ExclusionModal/store'
import cabinsEditModal from '@src/views/cadastros/cabines/EditModal/store'
import cabinsExclusionModal from '@src/views/cadastros/cabines/ExclusionModal/store'
import roteiros from '@src/views/cadastros/roteiros/store'
import itineraryExclusionModal from '@src/views/cadastros/roteiros/ExclusionModal/store'
import itineraryEditModal from '@src/views/cadastros/roteiros/EditModal/store'
import portos from '@src/views/cadastros/portos/store'
import portEditModal from '@src/views/cadastros/portos/EditModal/store'
import portExclusionModal from '@src/views/cadastros/portos/ExclusionModal/store'
import users from '@src/views/configurations/usuarios/store'
import userEditModal from '@src/views/configurations/usuarios/EditModal/store'
import userExclusionModal from '@src/views/configurations/usuarios/ExclusionModal/store'
import inventario from '@src/views/cadastros/inventario/store'
import reserva from '@src/views/dashboard/reservas/store'
import inventoryEditModal from '@src/views/cadastros/inventario/EditModal/store'
import deckEditModal from '@src/views/cadastros/decks/EditModal/store'
import deckExclusionModal from '@src/views/cadastros/decks/ExclusionModal/store'
import areaEditModal from '@src/views/cadastros/areas/EditModal/store'
import areaExclusionModal from '@src/views/cadastros/areas/ExclusionModal/store'
import passengerExclusionModal from '@src/views/cadastros/passageiros/ExclusionModal/store'
import priceEditModal from '@src/views/cadastros/preco/EditModal/store'
import precification from '@src/views/cadastros/preco/store'
import passengers from '@src/views/cadastros/passageiros/store'
import passengerEditModal from '@src/views/cadastros/passageiros/EditModal/store'
import passengerReservation from '@src/views/cadastros/passengerReservation/store'
import passengerReservationEditModal from '@src/views/cadastros/passengerReservation/EditModal/store'
import reservationEditPassengerModal from '@src/views/cadastros/passengerReservation/storePassenger.js'
import passengerInReservationExclusionModal from '@src/views/cadastros/passengerReservation/ExclusionModal/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  passengers,
  passengerEditModal,
  passengerExclusionModal,
  cabinChange,
  passengerInReservationExclusionModal,
  priceEditModal,
  passengerReservation,
  passengerReservationEditModal,
  reservationEditPassengerModal,
  inventario,
  precification,
  inventoryEditModal,
  cruises,
  deckEditModal,
  deckExclusionModal,
  navios,
  reserva,
  areaEditModal,
  areaExclusionModal,
  shipEditModal,
  shipExclusionModal,
  cabinsEditModal,
  cabinsExclusionModal,
  companyExclusionModal,
  cruisesEditModal,
  cabinPropertyEditModal,
  cabinPropertyExclusionModal,
  decks,
  cabinsByShip,
  cabinCategories,
  cabinProperties,
  areas,
  companhias,
  categoriesEditModal,
  cabinCategoriesExclusionModal,
  companyEditModal,
  destinos,
  destinationEditModal,
  destinationExclusionModal,
  roteiros,
  itineraryEditModal,
  itineraryExclusionModal,
  portos,
  portEditModal,
  portExclusionModal,
  users,
  userEditModal,
  userExclusionModal,
  dataTables
}

export default rootReducer
