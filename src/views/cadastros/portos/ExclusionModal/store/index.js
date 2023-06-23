// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const portExclusionModalSlice = createSlice({
  name: 'portExclusionModal',
  initialState: {
    modalIsOpen: false,
    portId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.portId = action.payload.portId
    }
  }
})

export const {
  handleExclusionModal
} = portExclusionModalSlice.actions

export default portExclusionModalSlice.reducer
