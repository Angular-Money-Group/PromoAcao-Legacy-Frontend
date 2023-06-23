// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getPassenger = createAsyncThunk('passenger/getData', async (params) => {
  const response = await axios.get(`/api/passenger/${params.passengerId}`, params)

  return {
    passenger: response.data[0],
    params
  }
})


export const getDocuments = async () => {
  const response = await axios.get('/api/document')

  return {
    data: response.data
  }
}

export const getCountry = async () => {
  const response = await axios.get('/api/country')

  return {
    data: response.data
  }
}

export const getState = async () => {
  const response = await axios.get('/api/state')

  return {
    data: response.data
  }
}

export const reservationEditPassengerModalSlice = createSlice({
  name: 'reservationEditPassengerModal',
  initialState: {
    modalIsOpen: false,
    passengerId: 0,
    passenger: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditPassengerModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.passengerId = action.payload.passengerId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPassenger.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPassenger.fulfilled, (state, action) => {
        state.passenger = action.payload.passenger
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getPassenger.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditPassengerModal
} = reservationEditPassengerModalSlice.actions

export default reservationEditPassengerModalSlice.reducer
