const defaultEndpoint = 'https://api.promoacao.sviluppa.com.br'

// ** Auth Endpoints
export default {
  loginEndpoint: `${defaultEndpoint}/api/auth/login`,
  // loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  getUserEndpoint: `${defaultEndpoint}/api/users`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'access_token',
  storageRefreshTokenKeyName: 'refreshToken'
}
