// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const companyExclusionModalSlice = createSlice({
  name: 'companyExclusionModal',
  initialState: {
    modalIsOpen: false,
    companyId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.companyId = action.payload.companyId
    }
  }
})

export const {
  handleExclusionModal
} = companyExclusionModalSlice.actions

export default companyExclusionModalSlice.reducer
