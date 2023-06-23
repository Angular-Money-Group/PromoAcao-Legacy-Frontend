// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getCompany = createAsyncThunk('navio/getData', async (params) => {
  const response = await axios.get(`/api/companies/${params.companyId}`, params)

  return {
    company: response.data[0],
    params
  }
})

export const companyEditModalSlice = createSlice({
  name: 'companyEditModal',
  initialState: {
    modalIsOpen: false,
    companyId: 0,
    company: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.companyId = action.payload.companyId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCompany.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload.company
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getCompany.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = companyEditModalSlice.actions

export default companyEditModalSlice.reducer
