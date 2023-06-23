// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const destinationExclusionModalSlice = createSlice({
  name: 'destinationExclusionModal',
  initialState: {
    modalIsOpen: false,
    destinationId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.destinationId = action.payload.destinationId
    }
  }
})

export const {
  handleExclusionModal
} = destinationExclusionModalSlice.actions

export default destinationExclusionModalSlice.reducer
