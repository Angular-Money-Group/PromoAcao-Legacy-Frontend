// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getDestination = createAsyncThunk('destino/getData', async (params) => {
  const response = await axios.get(`/api/destinations/${params.destinationId}`, params)

  return {
    destination: response.data[0],
    params
  }
})

export const destinationEditModalSlice = createSlice({
  name: 'destinationEditModal',
  initialState: {
    modalIsOpen: false,
    destinationId: 0,
    destination: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.destinationId = action.payload.destinationId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDestination.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDestination.fulfilled, (state, action) => {
        state.destination = action.payload.destination
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getDestination.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = destinationEditModalSlice.actions

export default destinationEditModalSlice.reducer
