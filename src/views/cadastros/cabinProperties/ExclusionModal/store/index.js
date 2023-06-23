// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cabinPropertyExclusionModalSlice = createSlice({
  name: 'cabinPropertyExclusionModal',
  initialState: {
    modalIsOpen: false,
    cabinPropertyId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.cabinPropertyId = action.payload.cabinPropertyId
    }
  }
})

export const {
  handleExclusionModal
} = cabinPropertyExclusionModalSlice.actions

export default cabinPropertyExclusionModalSlice.reducer
