// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getCruises = createAsyncThunk('cruise/getData', async (params) => {
  const response = await axios.get(`/api/cruises/${params.cruisesId}`, params)

  return {
    cruise: response.data[0],
    params
  }
})

export const cruisesEditModalSlice = createSlice({
  name: 'cruisesEditModal',
  initialState: {
    modalIsOpen: false,
    cruisesId: 0,
    cruise: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.cruisesId = action.payload.cruisesId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCruises.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCruises.fulfilled, (state, action) => {
        state.cruise = action.payload.cruise
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getCruises.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = cruisesEditModalSlice.actions

export default cruisesEditModalSlice.reducer
