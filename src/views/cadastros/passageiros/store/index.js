// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('passengers/getData', async params => {
  const response = await axios.get(`/api/passenger`, params)

  return {
    data: response.data?.data,
    totalPages: response.data?.total,
    params
  }
})

export const getDocuments = async () => {
  const response = await axios.get('/api/document')

  return {
    data: response.data
  }
}

export const getCountry = async () => {
  const response = await axios.get('/api/country')

  return {
    data: response.data
  }
}

export const getState = async () => {
  const response = await axios.get('/api/state')

  return {
    data: response.data
  }
}

export const passengersSlice = createSlice({
  name: 'passengers',
  initialState: {
    isLoading: false,
    data: [],
    passenger: null,
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

export default passengersSlice.reducer
