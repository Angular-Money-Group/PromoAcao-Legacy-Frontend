// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://lojapromoacao.com.br/' target='_blank' rel='noopener noreferrer'>
          Promoação
        </a>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Feito com
        <Heart size={14} />
      </span>
    </p>
  )
}

export default Footer
