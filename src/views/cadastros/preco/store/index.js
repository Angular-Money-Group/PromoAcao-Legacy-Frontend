// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('precification/getData', async (params) => {
  const response = await axios.get(`/api/cruise/${params.cruiseId}/category/precifications/?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}`, params)

  return {
    data: response.data.data,
    totalPages: response.data?.total,
    params
  }
})

export const precificationSlice = createSlice({
  name: 'precification',
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

export const {} = precificationSlice.actions

export default precificationSlice.reducer
