// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getPrice = createAsyncThunk('price/getData', async (params) => {
  const response = await axios.get(`/api/cruise/${params.cruiseId}/category/${params.cabinCategoryId}/precifications/`, params)

  return {
    precifications: response?.data?.data,
    params
  }
})

export const priceEditModalSlice = createSlice({
  name: 'priceEditModal',
  initialState: {
    modalIsOpen: false,
    priceId: 0,
    cabinCategoryId: 0,
    price: null,
    isLoading: false,
    precifications: [],
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.priceId = action.payload.priceId
      state.cabinCategoryId = action.payload.cabinCategoryId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getPrice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPrice.fulfilled, (state, action) => {
        state.isLoading = false
        state.precifications = action.payload.precifications
        state.params = action.payload.params
      })
      .addCase(getPrice.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = priceEditModalSlice.actions

export default priceEditModalSlice.reducer
