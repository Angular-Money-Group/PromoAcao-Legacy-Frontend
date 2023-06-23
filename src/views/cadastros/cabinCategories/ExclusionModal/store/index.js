// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cabinCategoriesExclusionModalSlice = createSlice({
  name: 'cabinCategoriesExclusionModal',
  initialState: {
    modalIsOpen: false,
    categoriesId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.categoriesId = action.payload.categoriesId
    }
  }
})

export const {
  handleExclusionModal
} = cabinCategoriesExclusionModalSlice.actions

export default cabinCategoriesExclusionModalSlice.reducer
