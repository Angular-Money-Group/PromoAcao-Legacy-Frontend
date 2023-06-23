// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cabinsExclusionModalSlice = createSlice({
  name: 'cabinsExclusionModal',
  initialState: {
    modalIsOpen: false,
    cabinsId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.cabinsId = action.payload.cabinsId
    }
  }
})

export const {
  handleExclusionModal
} = cabinsExclusionModalSlice.actions

export default cabinsExclusionModalSlice.reducer
