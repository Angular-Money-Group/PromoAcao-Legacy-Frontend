import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    full_name: "MSC",
    status: 1
  },
  {
    id: 2,
    full_name: 'Royal',
    status: 2
  },
  {
    id: 3,
    full_name: 'MSC',
    status: 1
  },
  {
    id: 4,
    full_name: 'MSC',
    status: 1
  },
  {
    id: 5,
    full_name: 'MSC',
    status: 1
  },
  {
    id: 6,
    full_name: 'Royal',
    status: 2
  },
  {
    id: 7,
    full_name: 'Royal',
    status: 1
  },
  {
    id: 8,
    full_name: 'MSC Fantasia',
    status: 1
  },
  {
    id: 9,
    full_name: 'Allyson Moakler',
    status: 2
  },
  {
    id: 10,
    full_name: 'Merline Penhalewick',
    status: 2
  },
  {
    id: 11,
    full_name: 'De Falloon',
    status: 2
  },
  {
    id: 12,
    full_name: 'Cyrus Gornal',
    status: 2
  },
  {
    id: 13,
    full_name: 'Tallou Balf',
    status: 2
  },
  {
    id: 14,
    full_name: 'Othilia Extill',
    status: 2
  },
  {
    id: 15,
    full_name: 'Wilmar Bourton',
    status: 2
  },
  {
    id: 16,
    full_name: 'Robinson Brazenor',
    status: 2
  },
  {
    id: 17,
    full_name: 'Nadia Bettenson',
    status: 1
  },
  {
    id: 18,
    full_name: 'Titus Hayne',
    status: 1
  },
  {
    id: 19,
    full_name: 'Roxie Huck',
    status: 2
  },
  {
    id: 20,
    full_name: 'Latashia Lewtey',
    status: 1
  },
  {
    id: 21,
    full_name: 'Natalina Tyne',
    status: 2
  },
  {
    id: 22,
    full_name: 'Faun Josefsen',
    status: 1
  },
  {
    id: 23,
    full_name: 'Rosmunda Steed',
    status: 2
  },
  {
    id: 24,
    full_name: 'Scott Jiran',
    status: 1
  },
  {
    id: 25,
    full_name: 'Carmita Medling',
    status: 1
  },
  {
    id: 26,
    full_name: 'Morgen Benes',
    status: 2
  },
  {
    id: 27,
    full_name: 'Onfroi Doughton',
    status: 1
  },
  {
    id: 28,
    full_name: 'Kliment McGinney',
    status: 2
  },
  {
    id: 29,
    full_name: 'Devin Bridgland',
    status: 1
  },
  {
    id: 30,
    full_name: 'Gilbert McFade',
    status: 2
  },
  {
    id: 31,
    full_name: 'Teressa Bleakman',
    status: 2
  },
  {
    id: 32,
    full_name: 'Marcelia Alleburton',
    status: 2
  },
  {
    id: 33,
    full_name: 'Aili De Coursey',
    status: 2
  },
  {
    id: 34,
    full_name: 'Charlton Chatres',
    status: 1
  },
  {
    id: 35,
    full_name: 'Nat Hugonnet',
    status: 2
  },
  {
    id: 36,
    full_name: 'Lorine Hearsum',
    status: 2
  },
  {
    id: 37,
    full_name: 'Sheila-kathryn Haborn',
    status: 1
  },
  {
    id: 38,
    full_name: 'Alma Harvatt',
    status: 1
  },
  {
    id: 39,
    full_name: 'Beatrix Longland',
    status: 2
  },
  {
    id: 40,
    full_name: 'Hammad Condell',
    status: 2
  },
  {
    id: 41,
    full_name: 'Parker Bice',
    status: 2
  },
  {
    id: 42,
    full_name: 'Lowrance Orsi',
    status: 1
  },
  {
    id: 43,
    full_name: 'Ddene Chaplyn',
    status: 2
  },
  {
    id: 44,
    full_name: 'Washington Bygraves',
    status: 1
  },
  {
    id: 45,
    full_name: 'Meghann Bodechon',
    status: 2
  },
  {
    id: 46,
    full_name: 'Moshe De Ambrosis',
    status: 2
  },
  {
    id: 47,
    full_name: 'Had Chatelot',
    status: 2
  },
  {
    id: 48,
    full_name: 'Georgia McCrum',
    status: 1
  },
  {
    id: 49,
    full_name: 'Krishnah Stilldale',
    status: 1
  },
  {
    id: 50,
    full_name: 'Mario Umbert',
    status: 1
  },
  {
    id: 51,
    full_name: 'Edvard Dixsee',
    status: 1
  },
  {
    id: 52,
    full_name: 'Tammie Davydoch',
    status: 1
  },
  {
    id: 53,
    full_name: 'Benito Rodolico',
    status: 2
  },
  {
    id: 54,
    full_name: 'Marco Pennings',
    status: 1
  },
  {
    id: 55,
    full_name: "Tommie O'Corr",
    status: 1
  },
  {
    id: 56,
    full_name: 'Cybill Poyle',
    status: 1
  },
  {
    id: 57,
    full_name: 'Norry Stoller',
    status: 2
  },
  {
    id: 58,
    full_name: 'Wendi Somerlie',
    status: 2
  },
  {
    id: 59,
    full_name: 'Ferdie Georgeon',
    status: 2
  },
  {
    id: 60,
    full_name: 'Jules Auten',
    status: 2
  },
  {
    id: 61,
    full_name: 'Nichole Dacres',
    status: 1
  },
  {
    id: 62,
    full_name: 'Holly Edgworth',
    status: 2
  },
  {
    id: 63,
    full_name: 'Henriette Croft',
    status: 2
  },
  {
    id: 64,
    full_name: 'Annetta Glozman',
    status: 2
  },
  {
    id: 65,
    full_name: 'Cletis Cervantes',
    status: 1
  },
  {
    id: 66,
    full_name: 'Christos Kiley',
    status: 1
  },
  {
    id: 67,
    full_name: 'Silvain Siebert',
    status: 2
  },
  {
    id: 68,
    full_name: 'Sharla Ibberson',
    status: 1
  },
  {
    id: 69,
    full_name: 'Ripley Rentcome',
    status: 2
  },
  {
    id: 70,
    full_name: 'Chrisse Birrane',
    status: 2
  },
  {
    id: 71,
    full_name: 'Georges Tesyro',
    status: 1
  },
  {
    id: 72,
    full_name: 'Bondon Hazard',
    status: 2
  },
  {
    id: 73,
    full_name: 'Aliza MacElholm',
    status: 2
  },
  {
    id: 74,
    full_name: 'Lucas Witherdon',
    status: 1
  },
  {
    id: 75,
    full_name: 'Pegeen Peasegod',
    status: 1
  },
  {
    id: 76,
    full_name: 'Elyn Watkinson',
    status: 1
  },
  {
    id: 77,
    full_name: 'Babb Skirving',
    status: 2
  },
  {
    id: 78,
    full_name: 'Shelli Ondracek',
    status: 1
  },
  {
    id: 79,
    full_name: 'Stanislaw Melloy',
    status: 2
  },
  {
    id: 80,
    full_name: 'Seamus Eisikovitsh',
    status: 1
  },
  {
    id: 81,
    full_name: 'Tammie Wattins',
    status: 2
  },
  {
    id: 82,
    full_name: 'Aila Quailadis',
    status: 2
  },
  {
    id: 83,
    full_name: 'Myrvyn Gilogly',
    status: 2
  },
  {
    id: 84,
    full_name: 'Hanna Langthorne',
    status: 1
  },
  {
    id: 85,
    full_name: 'Ruby Gimblet',
    status: 2
  },
  {
    id: 86,
    full_name: 'Louis Paszak',
    status: 2
  },
  {
    id: 87,
    full_name: 'Glennie Riolfi',
    status: 1
  },
  {
    id: 88,
    full_name: 'Jemimah Morgan',
    status: 1
  },
  {
    id: 89,
    full_name: 'Talya Brandon',
    status: 1
  },
  {
    id: 90,
    full_name: 'Renate Shay',
    status: 1
  },
  {
    id: 91,
    full_name: 'Julianne Bartosik',
    status: 1
  },
  {
    id: 92,
    full_name: 'Yvonne Emberton',
    status: 2
  },
  {
    id: 93,
    full_name: 'Danya Faichnie',
    status: 2
  },
  {
    id: 94,
    full_name: 'Ronica Hasted',
    status: 2
  },
  {
    id: 95,
    full_name: 'Edwina Ebsworth',
    status: 1
  },
  {
    id: 96,
    full_name: 'Alaric Beslier',
    status: 2
  },
  {
    id: 97,
    full_name: 'Reina Peckett',
    status: 2
  },
  {
    id: 98,
    full_name: 'Olivette Gudgin',
    status: 2
  },
  {
    id: 99,
    full_name: 'Evangelina Carnock',
    status: 2
  },
  {
    id: 100,
    full_name: 'Glyn Giacoppo',
    status: 2
  }
]

mock.onGet('/api/companhias/data').reply(() => {
  return [200, data]
})

mock.onGet('/api/companhias/data').reply(config => {
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
