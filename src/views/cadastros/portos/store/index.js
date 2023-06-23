// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('portos/getData', async params => {
  const response = await axios.get(`/api/ports?limit=${params.perPage}&page=${params.page}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data?.data,
    totalPages: response.data?.total,
    params
  }
})

export const portosSlice = createSlice({
  name: 'portos',
  initialState: {
    isLoading: false,
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

export default portosSlice.reducer
