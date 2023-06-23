// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const deckExclusionModalSlice = createSlice({
  name: 'deckExclusionModal',
  initialState: {
    modalIsOpen: false,
    deckId: 0
  },
  reducers: {
    handleExclusionModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.deckId = action.payload.deckId
    }
  }
})

export const {
  handleExclusionModal
} = deckExclusionModalSlice.actions

export default deckExclusionModalSlice.reducer
