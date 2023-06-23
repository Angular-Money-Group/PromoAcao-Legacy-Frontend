// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getUser = createAsyncThunk('navio/getData', async (params) => {
  const response = await axios.get(`/api/users/${params.userId}`, params)

  return {
    user: response.data,
    params
  }
})

export const userEditModalSlice = createSlice({
  name: 'userEditModal',
  initialState: {
    modalIsOpen: false,
    userId: 0,
    user: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.userId = action.payload.userId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = userEditModalSlice.actions

export default userEditModalSlice.reducer
