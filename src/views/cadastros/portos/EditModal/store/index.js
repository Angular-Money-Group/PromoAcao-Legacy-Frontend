// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getPort = createAsyncThunk('port/getData', async (params) => {
  const response = await axios.get(`/api/ports/${params.portId}`, params)

  return {
    port: response.data[0],
    params
  }
})

export const portEditModalSlice = createSlice({
  name: 'portEditModal',
  initialState: {
    modalIsOpen: false,
    isLoading: false,
    portId: 0,
    port: null,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.portId = action.payload.portId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPort.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPort.fulfilled, (state, action) => {
        state.port = action.payload.port
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getPort.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = portEditModalSlice.actions

export default portEditModalSlice.reducer
