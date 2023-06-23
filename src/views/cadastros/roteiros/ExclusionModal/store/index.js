// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const itineraryExclusionModalSlice = createSlice({
  name: 'itineraryExclusionModal',
  initialState: {
    modalIsOpen: false,
    itineraryId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.itineraryId = action.payload.itineraryId
    }
  }
})

export const {
  handleExclusionModal
} = itineraryExclusionModalSlice.actions

export default itineraryExclusionModalSlice.reducer
