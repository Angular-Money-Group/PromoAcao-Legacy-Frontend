// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getItinerary = createAsyncThunk('itinerary/getData', async (params) => {
  const response = await axios.get(`/api/itineraries/${params.itineraryId}`, params)

  return {
    itinerary: response.data,
    params
  }
})

export const itineraryEditModalSlice = createSlice({
  name: 'itineraryEditModal',
  initialState: {
    modalIsOpen: false,
    isLoading: false,
    itineraryId: 0,
    itinerary: null,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.itineraryId = action.payload.itineraryId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getItinerary.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItinerary.fulfilled, (state, action) => {
        state.itinerary = action.payload.itinerary
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getItinerary.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = itineraryEditModalSlice.actions

export default itineraryEditModalSlice.reducer
