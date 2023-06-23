// ** React Imports
import { useState, useEffect, useContext } from 'react'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'

// ** Third Party Components
import axios from 'axios'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  DropdownItem
} from 'reactstrap'

// ** Demo Components
import AvgSales from '@src/views/ui-elements/cards/analytics/AvgSales'

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'

const AnalyticsDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** States
  const [data, setData] = useState(null)

  const donutColors = {
    series1: '#DD2F21',
    series2: '#FF9F43',
    series3: '#826bf8',
    series4: '#EA5455',
    series5: '#FFA1A1'
  }

  // ** Chart Options
  const options = {
    colors: [donutColors.series1, donutColors.series2, donutColors.series4],
    plotOptions: {
      radialBar: {
        size: 185,
        hollow: {
          size: '25%'
        },
        track: {
          margin: 15
        },
        dataLabels: {
          name: {
            fontSize: '2rem',
            fontFamily: 'Montserrat'
          },
          value: {
            fontSize: '1rem',
            fontFamily: 'Montserrat'
          },
          total: {
            show: true,
            fontSize: '1rem',
            fontWeight: 'bold',
            label: 'Total',
            color: '#7367F0',
            formatter() {
              return '42459'
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30
      }
    },
    legend: {
      show: true,
      position: 'bottom'
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['Cancelado', 'Pendente', 'Finalizado']
  }

  useEffect(() => {
    axios.get('/card/card-analytics/avg_sales').then(res => setData(res.data))
    return () => setData(null)
  }, [])

  return data !== null ? (
    <div id='dashboard-analytics'>
      <Row className='match-height'>
        <Col lg='7' xs='12'>
          <AvgSales primary={colors.secondary.main} />
        </Col>
        <Col lg='5' xs='12'>
          <Card>
            <CardHeader
              className='d-flex flex-sm-row flex-column justify-content-md-between align-items-center justify-content-start'
            >
              <CardTitle tag='h4'>Status de Vendas</CardTitle>
              <UncontrolledDropdown className='chart-dropdown'>
                <DropdownToggle
                  color=''
                  className='bg-transparent btn-sm border-0 p-50'
                >
                  Últimos 7 dias
                </DropdownToggle>
                <DropdownMenu end>
                  {data.last_days.map(item => (
                    <DropdownItem className='w-100' key={item}>
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
            </CardHeader>
            <CardBody>
              <Chart options={options} series={[80, 50, 35]} type='radialBar' height={350} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  ) : null
}

export default AnalyticsDashboard
