// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const cabinChangeSlice = createSlice({
  name: 'cabinChange',
  initialState: {
    modalIsOpen: false
  },
  reducers: {
    handleCabinChangeModal: (state, action) => {
      state.modalIsOpen = action.payload
    }
  }
})

export const { handleCabinChangeModal } = cabinChangeSlice.actions

export default cabinChangeSlice.reducer
