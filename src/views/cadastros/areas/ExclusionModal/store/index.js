// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const areaExclusionModalSlice = createSlice({
  name: 'areaExclusionModal',
  initialState: {
    modalIsOpen: false,
    areaId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.areaId = action.payload.areaId
    }
  }
})

export const {
  handleExclusionModal
} = areaExclusionModalSlice.actions

export default areaExclusionModalSlice.reducer
