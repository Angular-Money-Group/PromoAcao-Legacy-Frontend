// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('roteiros/getData', async params => {
  const response = await axios.get(`/api/itineraries?limit=${params.perPage}&page=${params.page}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data?.data,
    totalPages: response.data?.total,
    params
  }
})

export const getDestinations = createAsyncThunk('roteiros/getDestinations', async () => {
  const response = await axios.get('/api/destinations')

  return {
    destinations: response.data?.data
  }
})

export const roteirosSlice = createSlice({
  name: 'roteiros',
  initialState: {
    isLoading: false,
    destinationsIsLoading: false,
    data: [],
    destinations: [],
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
      .addCase(getDestinations.pending, (state) => {
        state.destinationsIsLoading = true
      })
      .addCase(getDestinations.fulfilled, (state, action) => {
        state.destinations = action.payload.destinations
        state.destinationsIsLoading = false
      })
      .addCase(getDestinations.rejected, (state) => {
        state.destinationsIsLoading = false
      })
  }
})

export default roteirosSlice.reducer
