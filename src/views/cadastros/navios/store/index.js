// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('navios/getData', async (params) => {
  const response = await axios.get(`/api/ships?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data?.data,
    totalPages: response.data?.total,
    params
  }
})

export const getCompanies = async () => {
  const response = await axios.get('/api/companies')

  return {
    data: response.data.data
  }
}

export const naviosSlice = createSlice({
  name: 'navios',
  initialState: {
    isLoading: false,
    exclusionModalIsOpen: false,
    data: [],
    ship: null,
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

export const {} = naviosSlice.actions

export default naviosSlice.reducer
