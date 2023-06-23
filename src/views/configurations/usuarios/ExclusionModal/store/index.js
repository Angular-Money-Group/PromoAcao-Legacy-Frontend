// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const userExclusionModalSlice = createSlice({
  name: 'userExclusionModal',
  initialState: {
    modalIsOpen: false,
    userId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.userId = action.payload.userId
    }
  }
})

export const {
  handleExclusionModal
} = userExclusionModalSlice.actions

export default userExclusionModalSlice.reducer
