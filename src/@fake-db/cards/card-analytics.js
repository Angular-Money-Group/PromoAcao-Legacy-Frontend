import mock from '../mock'

const data = {
  avg_sales: {
    sales: '90.000,00',
    last_days: ['Últimos 28 dias', 'Último mês', 'Último ano'],
    growth: '+5.2%',
    goal: '100.000,00',
    users: 90,
    retention: 90,
    duration: 1
  }
}

mock.onGet('/card/card-analytics/avg_sales').reply(() => [200, data.avg_sales])
