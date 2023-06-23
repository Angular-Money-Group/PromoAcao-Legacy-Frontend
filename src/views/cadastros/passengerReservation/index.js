// ** React Imports
import { Fragment, useState, memo, forwardRef, useEffect } from "react"
import { useParams } from "react-router-dom"

// ** Table Columns
import { columns } from "./data"

// ** Store & Actions
import { getData } from "./store"
import { useDispatch, useSelector } from "react-redux"

import { getReservationPassenger, handleEditModal } from "./EditModal/store"

// ** Edit Modal Component
import EditModal from "./EditModal/EditModal"

// ** Add New Modal Component
import AddNewModal from './AddNewModal'

// ** Exclusion Modal Component
import ExclusionModal from './ExclusionModal/ExclusionModal'

// ** Edit Passenger Modal Component
import EditPassengerModal from "./EditPassengerModal"

// ** Third Party Components
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import moment from "moment/moment"
import Spinner from "@components/spinner/Loading-spinner"
import { ChevronDown } from "react-feather"

import { axiosInstance as axios } from "@utils"

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Button,
  CardBody,
  Badge,
  Input
} from "reactstrap"
import AddNewModalRegister from "./AddModalRegister"

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
))

const PassengerReservation = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector((state) => state.passengerReservation)

  const [modal, setModal] = useState(false)
  const [modalPassenger, setModalPassenger] = useState(false)
  const [currentPage] = useState(1)
  const [rowsPerPage] = useState(20)
  const [searchValue] = useState("")

  // ** Function to handle Modal toggle
  const handleModal = () => {
    setModal(!modal)
  }

  const handleModalPassenger = () => {
    setModalPassenger(!modalPassenger)
  }

  // ** Hooks
  const { id } = useParams()

  // ** Get data on mount
  useEffect(() => {
    dispatch(
      getData({
        page: currentPage,
        perPage: rowsPerPage,
        reservationId: id,
        name: searchValue
      })
    )
  }, [dispatch])

  const [reservations, setReservations] = useState([])

  useEffect(() => {
    axios.get(`/api/reservation/${id}`).then((result) => {
      setReservations(result.data)
      console.log(result.data)
      dispatch(
        getData({
          page: currentPage,
          perPage: rowsPerPage,
          name: searchValue,
          reservationId: id
        })
      )
    })
  }, [])

  const CustomPagination = () => {
    const count = Math.ceil(store.total / rowsPerPage)

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* <div style={{ marginLeft: "1rem" }}>
          Visualizando {lastItem === 0 ? 0 : initialItem} a {lastItem} de{" "}
          {store.total} registros
        </div> */}
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel="..."
          pageCount={Math.ceil(count) || 1}
          marginPagesDisplayed={3}
          pageRangeDisplayed={3}
          activeClassName="active"
          forcePage={currentPage !== 0 ? currentPage - 1 : 0}
          onPageChange={(page) => handlePagination(page)}
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName={
            "pagination react-paginate separated-pagination justify-content-end pe-1 mt-1"
          }
        />
      </div>
    )
  }

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      name: searchValue
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.data.slice(0, rowsPerPage)
    }
  }

  const customStyles = {
    headCells: {
      style: {
        paddingRight: "40px"
      }
    },
    cells: {
      style: {
        paddingRight: "40px"
      }
    }
  }

  const editModalStore = useSelector(state => state.passengerReservationEditModal)
  const editModalIsOpen = editModalStore.modalIsOpen

  const handleEditModalOpen = e => {
    e.preventDefault()
    dispatch(getReservationPassenger({
      reservationId: id
    }))
    dispatch(handleEditModal({
      onOpen: !editModalIsOpen,
      reservationId: id
    }))
  }

  const status = {
    'Reserva Confirmada': { title: 'Reserva Confirmada', color: 'light-success' },
    'Pré Reserva': { title: 'Pré-Reserva', color: 'light-warning' },
    Cancelado: { title: 'Cancelado', color: 'light-danger' }
  }

  return (
    <Fragment>
      {reservations?.map((reservation) => {
        return (
          <Fragment key={reservation.id}>
            <div className="d-flex">
              <Card style={{ flex: 1, marginRight: 40 }}>
                <CardHeader className="border-bottom d-flex gap-1" style={{ alignItems: 'flex-start' }}>
                  <Badge style={{ marginRight: 'auto', padding: '10px 20px', fontSize: 17 }} color={status[reservation?.status]?.color} pill>
                    {status[reservation?.status]?.title}
                  </Badge>
                  <div className="d-flex flex-column gap-1">
                    <CardTitle
                      style={{ marginLeft: "auto", fontSize: 28 }}
                      tag="h4"
                    >
                      Reserva #{reservation.id}
                    </CardTitle>
                    <CardTitle
                      style={{ marginLeft: "auto", fontSize: 14 }}
                      tag="span"
                    >
                      Data da reserva:{" "}
                      {moment(reservation.created_at).format("DD/MM/YYYY")}
                    </CardTitle>
                    <CardTitle
                      style={{
                        marginLeft: "auto",
                        paddingBottom: 150,
                        fontSize: 14
                      }}
                      tag="span"
                    >
                      Data da atualização:{" "}
                      {moment(reservation.updated_at).format("DD/MM/YYYY")}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardBody className="d-flex align-items-center justify-content-between p-5">
                  <div className="d-flex flex-column">
                    <CardTitle>Informações da reserva</CardTitle>
                    <span>
                      {reservation.name} {reservation.lastname}
                    </span>
                    <span>
                      {reservation.country.name}, {reservation.state.name},{" "}
                      {reservation.city}
                    </span>
                    <span>{reservation.phone_number}</span>
                    <span>{reservation.email}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <CardTitle>Informações de Pagamento</CardTitle>
                    <span>Total Pago: R$ {reservation.price}</span>
                    <span>Forma de pagamento: Cartão</span>
                    <span>Bandeira: Visa</span>
                    <span>NSU: ETD1231232123</span>
                  </div>
                </CardBody>
              </Card>

              <Card
                className="d-flex p-1 gap-1 justify-content-center"
                style={{ height: 320, width: 280 }}
              >
                <Button color="primary" onClick={handleModal}>
                  <span className="align-middle">Adicionar Passageiro</span>
                </Button>
                <Button color="primary" onClick={handleModalPassenger}>
                  <span className="align-middle">
                    Adicionar Passageiro ja Registrado
                  </span>
                </Button>
                <Button color="none" style={{ border: "1px solid #6e6b7b" }}>
                  <span className="align-middle">Trocar Cabine</span>
                </Button>
                <Button
                  color="none"
                  style={{ border: "1px solid #6e6b7b" }}
                  onClick={handleEditModalOpen}
                >
                  <span className="align-middle ms-50">Editar</span>
                </Button>
              </Card>
            </div>

            <div
              className="react-dataTable react-dataTable-selectable-rows gap-4"
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Card>
                <CardHeader>
                  <span>ITEM</span>
                  <span>PASSAGEIROS</span>
                  <span>TAXA</span>
                  <span>PREÇO</span>
                </CardHeader>

                <CardBody className="d-flex align-items-center flex-wrap justify-content-between">
                  <div className="d-flex flex-column">
                    <span style={{ fontSize: 18, fontWeight: "bold" }}>
                      {reservation.cruise.name}
                    </span>
                    <span>Cabine {reservation.inventory.cabin}</span>
                    <span>
                      {" "}
                      Deck {reservation.inventory.deck} |{" "}
                      {reservation.cabin_category.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    {reservation.inventory.current_occupation}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    R$ {reservation.rate}
                  </span>
                  <span style={{ fontSize: 18, fontWeight: "bold" }}>
                    R$ {reservation.price}
                  </span>
                </CardBody>
              </Card>

              <DataTable
                noHeader
                selectableRows
                columns={columns}
                className="react-dataTable"
                progressPending={store.isLoading}
                progressComponent={
                  <p className="pt-2 pb-2">
                    <Spinner />
                  </p>
                }
                noDataComponent={
                  <p className="pt-2">Não há registros para exibir</p>
                }
                sortIcon={<ChevronDown size={10} />}
                component
                selectableRowsComponent={BootstrapCheckbox}
                data={dataToRender()}
                customStyles={customStyles}
              />
            </div>
          </Fragment>
        )
      })}

      <AddNewModalRegister
        open={modalPassenger}
        handleModalPassenger={handleModalPassenger}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />

      <AddNewModal
        open={modal}
        handleModal={handleModal}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />

      <EditModal
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />

      <EditPassengerModal
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />

      <ExclusionModal
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        searchValue={searchValue}
      />
    </Fragment>
  )
}

export default memo(PassengerReservation)
