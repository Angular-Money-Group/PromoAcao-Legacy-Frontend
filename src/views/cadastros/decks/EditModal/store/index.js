// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getDecks = createAsyncThunk('deck/getData', async (params) => {
  const response = await axios.get(`/api/decks/${params.deckId}`, params)

  return {
    deck: response.data[0],
    params
  }
})

export const deckEditModalSlice = createSlice({
  name: 'deckEditModal',
  initialState: {
    modalIsOpen: false,
    deckId: 0,
    deck: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.deckId = action.payload.deckId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getDecks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.deck = action.payload.deck
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getDecks.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = deckEditModalSlice.actions

export default deckEditModalSlice.reducer
