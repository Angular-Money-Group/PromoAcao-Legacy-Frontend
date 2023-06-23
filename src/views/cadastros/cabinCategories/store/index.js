// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('cabinCategories/getData', async params => {
  const response = await axios.get(`/api/ships/${params.shipId}/cabin/categories?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response?.data?.data,
    totalPages: response?.data?.total,
    params
  }
})

export const cabinCategoriesSlice = createSlice({
  name: 'cabinCategories',
  initialState: {
    isLoading: false,
    data: [],
    total: 1,
    areasId: 0,
    params: {}
  },
  reducers: {
    handleGetAreaByShipId: (state, action) => {
      state.areasId = action.payload.areasId
    }
  },
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

export const {
  handleGetAreaByShipId
} = cabinCategoriesSlice.actions

export default cabinCategoriesSlice.reducer