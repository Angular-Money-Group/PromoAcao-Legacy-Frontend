// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

import { useParams } from 'react-router-dom'

export const getReservationPassenger = createAsyncThunk('property/getData', async (params) => {
  const { id } = useParams()
  const response = await axios.get(`/api/reservation/${id}`, params)
  return {
    property: response.data,
    params
  }
})


export const passengerReservationEditModalSlice = createSlice({
  name: 'passengerReservationEditModal',
  initialState: {
    modalIsOpen: false,
    reservationId: 0,
    property: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.reservationId = action.payload.reservationId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getReservationPassenger.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getReservationPassenger.fulfilled, (state, action) => {
        state.property = action.payload.property
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getReservationPassenger.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = passengerReservationEditModalSlice.actions

export default passengerReservationEditModalSlice.reducer
