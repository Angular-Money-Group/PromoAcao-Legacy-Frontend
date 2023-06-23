// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const passengerExclusionModalSlice = createSlice({
  name: 'passengerExclusionModal',
  initialState: {
    modalIsOpen: false,
    passengerId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.passengerId = action.payload.passengerId
    }
  }
})

export const {
  handleExclusionModal
} = passengerExclusionModalSlice.actions

export default passengerExclusionModalSlice.reducer
