import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    full_name: "MSC Fantasia",
    companhia: 'MSC',
    city: 'Krasnosilka',
    status: 1
  },
  {
    id: 2,
    full_name: 'MSC Música',
    companhia: 'MSC',
    city: 'Hinigaran',
    status: 2
  },
  {
    id: 3,
    full_name: 'MSC Música',
    companhia: 'MSC',
    city: 'Golcowa',
    status: 1
  },
  {
    id: 4,
    full_name: 'MSC Música',
    companhia: 'MSC',
    city: 'Paquera',
    status: 1
  },
  {
    id: 5,
    full_name: 'MSC Fantasia',
    companhia: 'MSC',
    city: 'Lucan',
    status: 1
  },
  {
    id: 6,
    full_name: 'MSC Fantasia',
    companhia: 'MSC',
    city: 'Maofan',
    status: 2
  },
  {
    id: 7,
    full_name: 'MSC Fantasia',
    companhia: 'MSC',
    city: 'Lampuyang',
    status: 1
  },
  {
    id: 8,
    full_name: 'MSC Fantasia',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 9,
    full_name: 'Allyson Moakler',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 10,
    full_name: 'Merline Penhalewick',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 11,
    full_name: 'De Falloon',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 12,
    full_name: 'Cyrus Gornal',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 13,
    full_name: 'Tallou Balf',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 14,
    full_name: 'Othilia Extill',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 15,
    full_name: 'Wilmar Bourton',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 16,
    full_name: 'Robinson Brazenor',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 17,
    full_name: 'Nadia Bettenson',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 18,
    full_name: 'Titus Hayne',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 19,
    full_name: 'Roxie Huck',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 20,
    full_name: 'Latashia Lewtey',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 21,
    full_name: 'Natalina Tyne',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 22,
    full_name: 'Faun Josefsen',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 23,
    full_name: 'Rosmunda Steed',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 24,
    full_name: 'Scott Jiran',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 25,
    full_name: 'Carmita Medling',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 26,
    full_name: 'Morgen Benes',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 27,
    full_name: 'Onfroi Doughton',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 28,
    full_name: 'Kliment McGinney',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 29,
    full_name: 'Devin Bridgland',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 30,
    full_name: 'Gilbert McFade',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 31,
    full_name: 'Teressa Bleakman',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 32,
    full_name: 'Marcelia Alleburton',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 33,
    full_name: 'Aili De Coursey',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 34,
    full_name: 'Charlton Chatres',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 35,
    full_name: 'Nat Hugonnet',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 36,
    full_name: 'Lorine Hearsum',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 37,
    full_name: 'Sheila-kathryn Haborn',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 38,
    full_name: 'Alma Harvatt',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 39,
    full_name: 'Beatrix Longland',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 40,
    full_name: 'Hammad Condell',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 41,
    full_name: 'Parker Bice',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 42,
    full_name: 'Lowrance Orsi',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 43,
    full_name: 'Ddene Chaplyn',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 44,
    full_name: 'Washington Bygraves',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 45,
    full_name: 'Meghann Bodechon',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 46,
    full_name: 'Moshe De Ambrosis',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 47,
    full_name: 'Had Chatelot',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 48,
    full_name: 'Georgia McCrum',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 49,
    full_name: 'Krishnah Stilldale',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 50,
    full_name: 'Mario Umbert',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 51,
    full_name: 'Edvard Dixsee',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 52,
    full_name: 'Tammie Davydoch',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 53,
    full_name: 'Benito Rodolico',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 54,
    full_name: 'Marco Pennings',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 55,
    full_name: "Tommie O'Corr",
    companhia: 'MSC',
    status: 1
  },
  {
    id: 56,
    full_name: 'Cybill Poyle',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 57,
    full_name: 'Norry Stoller',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 58,
    full_name: 'Wendi Somerlie',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 59,
    full_name: 'Ferdie Georgeon',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 60,
    full_name: 'Jules Auten',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 61,
    full_name: 'Nichole Dacres',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 62,
    full_name: 'Holly Edgworth',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 63,
    full_name: 'Henriette Croft',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 64,
    full_name: 'Annetta Glozman',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 65,
    full_name: 'Cletis Cervantes',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 66,
    full_name: 'Christos Kiley',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 67,
    full_name: 'Silvain Siebert',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 68,
    full_name: 'Sharla Ibberson',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 69,
    full_name: 'Ripley Rentcome',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 70,
    full_name: 'Chrisse Birrane',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 71,
    full_name: 'Georges Tesyro',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 72,
    full_name: 'Bondon Hazard',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 73,
    full_name: 'Aliza MacElholm',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 74,
    full_name: 'Lucas Witherdon',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 75,
    full_name: 'Pegeen Peasegod',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 76,
    full_name: 'Elyn Watkinson',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 77,
    full_name: 'Babb Skirving',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 78,
    full_name: 'Shelli Ondracek',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 79,
    full_name: 'Stanislaw Melloy',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 80,
    full_name: 'Seamus Eisikovitsh',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 81,
    full_name: 'Tammie Wattins',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 82,
    full_name: 'Aila Quailadis',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 83,
    full_name: 'Myrvyn Gilogly',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 84,
    full_name: 'Hanna Langthorne',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 85,
    full_name: 'Ruby Gimblet',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 86,
    full_name: 'Louis Paszak',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 87,
    full_name: 'Glennie Riolfi',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 88,
    full_name: 'Jemimah Morgan',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 89,
    full_name: 'Talya Brandon',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 90,
    full_name: 'Renate Shay',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 91,
    full_name: 'Julianne Bartosik',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 92,
    full_name: 'Yvonne Emberton',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 93,
    full_name: 'Danya Faichnie',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 94,
    full_name: 'Ronica Hasted',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 95,
    full_name: 'Edwina Ebsworth',
    companhia: 'MSC',
    status: 1
  },
  {
    id: 96,
    full_name: 'Alaric Beslier',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 97,
    full_name: 'Reina Peckett',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 98,
    full_name: 'Olivette Gudgin',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 99,
    full_name: 'Evangelina Carnock',
    companhia: 'MSC',
    status: 2
  },
  {
    id: 100,
    full_name: 'Glyn Giacoppo',
    companhia: 'MSC',
    status: 2
  }
]

mock.onGet('/api/navios/data').reply(() => {
  return [200, data]
})

mock.onGet('/api/navios/data').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.full_name.toLowerCase().includes(queryLowered) ||
      item.post.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.age.toLowerCase().includes(queryLowered) ||
      item.salary.toLowerCase().includes(queryLowered) ||
      item.end_date.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})
