// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('companhias/getData', async params => {
  const response = await axios.get(`api/companies?limit=${params.perPage}&page=${params.page}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data?.data,
    totalPages: response.data?.total,
    params
  }
})

export const companhiasSlice = createSlice({
  name: 'companhias',
  initialState: {
    data: [],
    total: 1,
    params: {}
  },
  reducers: {},
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

export default companhiasSlice.reducer
