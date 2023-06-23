// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getAreas = createAsyncThunk('area/getData', async (params) => {
  const response = await axios.get(`/api/areas/${params.areaId}`, params)

  return {
    area: response.data[0],
    params
  }
})

export const areaEditModalSlice = createSlice({
  name: 'areaEditModal',
  initialState: {
    modalIsOpen: false,
    areaId: 0,
    area: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.areaId = action.payload.areaId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAreas.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.area = action.payload.area
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getAreas.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = areaEditModalSlice.actions

export default areaEditModalSlice.reducer
