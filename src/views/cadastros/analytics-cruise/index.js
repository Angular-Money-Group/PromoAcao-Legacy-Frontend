// ** React Imports
import { useEffect, useState, Fragment } from "react"
import { useParams } from "react-router-dom"

// ** Third Party Components
import { User } from "react-feather"
import moment from "moment/moment"

import { axiosInstance as axios } from "@utils"

const AnalyticsCruise = () => {
  const [analytics, setAnalytics] = useState([])

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`/api/report/cruises/${id}?date=${moment(new Date()).format('YYYY-MM-DD')}`)
        .then((response) => {
          setAnalytics(response.data.data)
        })
        .catch(error => {
          console.error(error)
        })
      }, [analytics >= 0])

  return (
    <Fragment>
      {analytics?.map((analytic) => {
        return (
          <>
            <div className="d-flex flex-column" key={analytic?.id}>
              <h1 style={{ fontWeight: 'bold', color: "#000" }}>{analytic?.name} | {moment(analytic?.departure_date).format("DD-MM-YYYY")}</h1>
              <span className="text-black">MSC - Cruzeiros</span>
              <span className="text-black">{analytic?.ship.name}</span>
            </div>
            {analytic?.ship.areas.map((area) => {
              return (
                <>
                  <div className="mt-5">
                    <h2 className="mb-2" style={{ fontWeight: 'bold', color: '#000' }}>{area?.name}</h2>
                  </div>

                  <div className="d-flex gap-2 flex-wrap mb-5">
                    {area?.cabin_categories.map((category) => {
                      const numero = category?.current_occupation
                      const arrayDeNumeros = Array.from({ length: numero }, (_, index) => index + 1)

                      const icones = arrayDeNumeros.map((numero, index) => <User key={index} size='28' color="#DD2F21" />)

                      return (
                        <div
                          className="p-2 d-flex align-items-center justify-content-between"
                          style={{ background: '#FFF', width: '320px', height: '86px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '.75rem' }}
                        >
                          <div
                            className="d-flex align-items-center justify-content-center flex-column"
                            style={{ gap: '0.5rem' }}
                          >
                            <h3 className="text-success mb-0">{category?.count_disponiveis}</h3>
                            <h5 style={{ marginRight: 'auto' }} className="mb-0 text-danger">{category?.count_reservados}</h5>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-evenly flex-column"
                            style={{ gap: '0.5rem' }}
                          >
                            <div style={{ marginLeft: 'auto' }}>
                              {icones}
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                              {category?.precifications.length > 0 ? category?.precifications.map((precification) => {
                                return (
                                  <span>
                                    <strong>
                                      {precification?.name} | R$ {precification?.price} | R$ {precification?.rate}
                                    </strong>
                                  </span>
                                )
                              }) : (
                                <span>
                                  Não há lote
                                </span>
                              )}
                            </div>
                          </div>
                      </div>
                      )
                    })}
                </div>
                </>
              )
            })}

          </>
        )
      })}
    </Fragment>
  )
}

export default AnalyticsCruise