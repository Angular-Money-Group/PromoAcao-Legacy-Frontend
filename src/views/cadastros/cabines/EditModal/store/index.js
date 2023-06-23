// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getCabins = createAsyncThunk('cabins/getData', async (params) => {
  const response = await axios.get(`/api/cabins/${params.cabinsId}`, params)

  return {
    cabins: response.data[0],
    params
  }
})

export const cabinsEditModalSlice = createSlice({
  name: 'cabinsEditModal',
  initialState: {
    modalIsOpen: false,
    cabinsId: 0,
    cabins: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.cabinsId = action.payload.cabinsId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCabins.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCabins.fulfilled, (state, action) => {
        state.cabins = action.payload.cabins
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getCabins.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = cabinsEditModalSlice.actions

export default cabinsEditModalSlice.reducer
