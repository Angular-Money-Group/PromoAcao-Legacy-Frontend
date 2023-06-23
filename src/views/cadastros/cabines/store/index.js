// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getData = createAsyncThunk('cabinsByShip/getData', async params => {
  const response = await axios.get(`/api/ships/${params.shipId}/cabins?limit=${params.perPage}&page=${params.page}&keywords[sortby]=${params.sortBy}&keywords[sortorder]=${params.sortOrder || "asc"}&keywords[name]=${params?.name ?? ''}`, params)

  return {
    data: response.data.data,
    totalPages: response?.data?.total,
    params
  }
})

export const cabinsByShipSlice = createSlice({
  name: 'cabinsByShip',
  initialState: {
    isLoading: false,
    data: [],
    total: 1,
    params: {},
    cabinCategoriesId: 0,
    cabinPropertiesId: 0,
    deckId: 0
  },
  reducers: {
    handleGetDecksByShipId: (state, action) => {
      state.cabinCategoriesId = action.payload.cabinCategoriesId

      state.cabinPropertiesId = action.payload.cabinPropertiesId

      state.deckId = action.payload.deckId
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
  handleGetDecksByShipId
} = cabinsByShipSlice.actions

export default cabinsByShipSlice.reducer