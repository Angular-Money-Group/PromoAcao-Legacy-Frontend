// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('cruises/getData', async params => {
  const response = await axios.get(`/api/cruises`, params)
  
  return { 
    data: response?.data?.data, 
    totalPages: response?.data?.total,
    params
  }
  
})

export const getShips = async () => {
  const response = await axios.get('/api/ships')

  return {
    data: response.data.data
  }
}

export const getPorts = async () => {
  const response = await axios.get('/api/ports')

  return {
    data: response.data.data
  }
}

export const getDestination = async () => {
  const response = await axios.get('/api/destinations')

  return {
    data: response.data.data
  }
}

export const cruisesSlice = createSlice({
  name: 'cruises',
  initialState: {
    isLoading: false,
    data: [],
    total: 1,
    cruises: null,
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

export const {} = cruisesSlice.actions

export default cruisesSlice.reducer
