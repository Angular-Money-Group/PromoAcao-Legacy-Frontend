// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('inventario/getData', async (params) => {
  const response = await axios.get(`/api/cruises/${params.cruiseId}/inventories/all?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}&keywords[cabin]=${params?.name ?? ''}${params?.cabin_category_id ? `&keywords[cabin_category_id]=${params?.cabin_category_id}` : ''}${params?.cabin_property_id ? `&keywords[cabin_property_id]=${params?.cabin_property_id}` : ''}`, params)

  return {
    data: response.data.data,
    totalPages: response.data?.total,
    params
  }
})

export const getCategories = createAsyncThunk('categories/getData', async (params) => {
  const response = await axios.get(`/api/ships/${params.shipId}/cabin/categories`, params)

  return {
    data: response.data.data
  }
})

export const getProperties = createAsyncThunk('properties/getData', async (params) => {
  const response = await axios.get(`/api/ships/${params.shipId}/cabin/properties`, params)

  return {
    data: response.data
  }
})

export const inventarioSlice = createSlice({
  name: 'inventario',
  initialState: {
    isLoading: false,
    data: [],
    categories: [],
    properties: [],
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
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data
        state.isLoading = false
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getProperties.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.properties = action.payload.data
        state.isLoading = false
      })
      .addCase(getProperties.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {} = inventarioSlice.actions

export default inventarioSlice.reducer
