// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getShip = createAsyncThunk('navio/getData', async (params) => {
  const response = await axios.get(`/api/ships/${params.shipId}`, params)

  return {
    ship: response.data?.ship,
    company: response.data?.company,
    params
  }
})

export const shipEditModalSlice = createSlice({
  name: 'shipEditModal',
  initialState: {
    modalIsOpen: false,
    shipId: 0,
    ship: null,
    company: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.shipId = action.payload.shipId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getShip.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getShip.fulfilled, (state, action) => {
        state.ship = action.payload.ship
        state.company = action.payload.company
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getShip.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = shipEditModalSlice.actions

export default shipEditModalSlice.reducer
