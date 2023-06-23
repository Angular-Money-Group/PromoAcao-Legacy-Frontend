// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'


export const getData = createAsyncThunk('reservation/getData', async params => {
  const response = await axios.get(`/api/reservation/${params.reservationId}/passenger`, params)

  return {
    data: response.data.data,
    totalPages: response?.data?.total,
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

export const cabinsByShipSlice = createSlice({
  name: 'passengerReservation',
  initialState: {
    isLoading: false,
    data: [],
    total: 1,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
        state.isLoading = false
      })
      .addCase(getData.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = cabinsByShipSlice.actions

export default cabinsByShipSlice.reducer