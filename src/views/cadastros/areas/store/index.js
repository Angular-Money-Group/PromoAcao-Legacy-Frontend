// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('areas/getData', async params => {
  const response = await axios.get(`/api/ships/${params.shipId}/areas?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data,
    totalPages: response?.data?.length,
    params
  }
})

export const areasSlice = createSlice({
  name: 'areas',
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

export const {} = areasSlice.actions

export default areasSlice.reducer
