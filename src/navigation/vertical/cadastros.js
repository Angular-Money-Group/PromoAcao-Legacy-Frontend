// ** Icons Import
import {
  Map,
  MapPin,
  Anchor,
  Users
} from 'react-feather'

import spaceShipIcon from '../../assets/images/icons/space-ship-icon.svg'
import shipIcon from '../../assets/images/icons/ship-icon.svg'
import companyIcon from '../../assets/images/icons/company-icon.svg'

export default [
  {
    header: 'CADASTROS'
  },
  {
    id: 'cruzeiros',
    title: 'Cruzeiros',
    icon: (
      <img
        src={spaceShipIcon}
        size={20}
        style={{ marginLeft: '.2rem', paddingRight: '1.3rem' }}
      />
    ),
    navLink: '/cadastros/cruzeiros'
  },
  {
    id: 'navios',
    title: 'Navios',
    icon: (
      <img
        src={shipIcon}
        size={20}
        style={{ marginLeft: '.1rem', paddingRight: '1.1rem' }}
      />
    ),
    navLink: '/cadastros/navios'
  },
  {
    id: 'companhias',
    title: 'Companhias',
    icon: (
      <img
        src={companyIcon}
        size={2}
        style={{ marginLeft: '.2rem', paddingRight: '1.1rem' }}
      />
    ),
    navLink: '/cadastros/companhias'
  },
  {
    id: 'destinos',
    title: 'Destinos',
    icon: <MapPin size={20} />,
    navLink: '/cadastros/destinos'
  },
  {
    id: 'roteiros',
    title: 'Roteiros',
    icon: <Map size={20} />,
    navLink: '/cadastros/roteiros'
  },
  {
    id: 'portos',
    title: 'Portos',
    icon: <Anchor size={20} />,
    navLink: '/cadastros/portos'
  },
  {
    id: 'passageiros',
    title: 'Passageiros',
    icon: <Users size={20} />,
    navLink: '/cadastros/passageiros'
  }
]
