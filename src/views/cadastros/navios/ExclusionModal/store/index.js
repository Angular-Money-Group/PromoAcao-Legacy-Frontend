// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const shipExclusionModalSlice = createSlice({
  name: 'shipExclusionModal',
  initialState: {
    modalIsOpen: false,
    shipId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.shipId = action.payload.shipId
    }
  }
})

export const {
  handleExclusionModal
} = shipExclusionModalSlice.actions

export default shipExclusionModalSlice.reducer
