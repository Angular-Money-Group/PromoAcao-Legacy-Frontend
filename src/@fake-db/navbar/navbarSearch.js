import mock from '../mock'

export const searchArr = [
  {
    groupTitle: 'Pages',
    searchLimit: 4,
    data: [
      {
        id: 1,
        target: 'analyticsDash',
        isBookmarked: false,
        title: 'Analytics',
        icon: 'Home',
        link: '/dashboard/analytics'
      },
      {
        id: 2,
        target: 'reservasDash',
        isBookmarked: false,
        title: 'Reservas',
        icon: 'Home',
        link: '/'
      },
      {
        id: 3,
        target: 'cruzeiros',
        isBookmarked: false,
        title: 'Cruzeiros',
        icon: 'Home',
        link: '/cadastros/cruzeiros'
      },
      {
        id: 4,
        target: 'navios',
        isBookmarked: false,
        title: 'Navios',
        icon: 'Home',
        link: '/cadastros/navios'
      },
      {
        id: 5,
        target: 'companhias',
        isBookmarked: false,
        title: 'Companhias',
        icon: 'Home',
        link: '/cadastros/companhias'
      },
      {
        id: 6,
        target: 'destinos',
        isBookmarked: false,
        title: 'Destinos',
        icon: 'MapPin',
        link: '/cadastros/destinos'
      },
      {
        id: 7,
        target: 'roteiros',
        isBookmarked: false,
        title: 'Roteiros',
        icon: 'Map',
        link: '/cadastros/roteiros'
      },
      {
        id: 8,
        target: 'portos',
        isBookmarked: false,
        title: 'Portos',
        icon: 'Anchor',
        link: '/cadastros/portos'
      },
      {
        id: 9,
        target: 'passageiros',
        isBookmarked: false,
        title: 'Passageiros',
        icon: 'Users',
        link: '/cadastros/passageiros'
      },

      {
        id: 8,
        target: 'usuarios',
        isBookmarked: false,
        title: 'Usuários',
        icon: 'Home',
        link: '/configuracoes/usuarios'
      }
    ]
  }
]

// GET Search Data
mock.onGet('/api/main-search/data').reply(() => {
  return [200, { searchArr }]
})

// GET Search Data & Bookmarks
mock.onGet('/api/bookmarks/data').reply(() => {
  const bookmarks = searchArr[0].data.filter(item => item.isBookmarked)
  const suggestions = searchArr[0].data
  return [200, { suggestions, bookmarks }]
})

// POST Update isBookmarked
mock.onPost('/api/bookmarks/update').reply(config => {
  const { id } = JSON.parse(config.data)

  const obj = searchArr[0].data.find(item => item.id === id)

  Object.assign(obj, { isBookmarked: !obj.isBookmarked })

  return [200]
})
