// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('reserva/getData', async (params) => {
  const response = await axios.get(`/api/reservation?keywords[sortby]=id&keywords[sortorder]=desc&keywords[name]=${params?.name ?? ''}`, params)

  return { 
    data: response?.data?.data, 
    totalPages: response?.data?.total,
    params
  }
})

export const getDocument = async () => {
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

export const getCruise = async () => {
  const response = await axios.get('/api/cruises')

  return {
    data: response?.data.data
  }
}

export const getInventory = async (cabin_category_id) => {
  const response = await axios.get(`/api/cabins/categories/${cabin_category_id}/inventories/disponivel`)

  return {
    data: response.data.data
  }
}

export const reservaSlice = createSlice({
  name: 'reserva',
  initialState: {
    isLoading: false,
    data: [],
    reservation: null,
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

export const {} = reservaSlice.actions

export default reservaSlice.reducer
