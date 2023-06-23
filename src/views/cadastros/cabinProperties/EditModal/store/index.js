// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getCabinsProperty = createAsyncThunk('cabinProperty/getData', async (params) => {
  const response = await axios.get(`/api/cabins/properties/${params.cabinPropertyId}`, params)

  return {
    cabin_property: response.data[0],
    params
  }
})

export const cabinPropertyEditModalSlice = createSlice({
  name: 'cabinPropertyEditModal',
  initialState: {
    modalIsOpen: false,
    cabinPropertyId: 0,
    cabin_property: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.cabinPropertyId = action.payload.cabinPropertyId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCabinsProperty.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCabinsProperty.fulfilled, (state, action) => {
        state.cabin_property = action.payload.cabin_property
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getCabinsProperty.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = cabinPropertyEditModalSlice.actions

export default cabinPropertyEditModalSlice.reducer
