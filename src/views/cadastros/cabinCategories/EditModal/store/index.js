// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getCategories = createAsyncThunk('categorias/getData', async (params) => {
  const response = await axios.get(`/api/cabins/categories/${params.categoriesId}`, params)

  return {
    category: response.data[0],
    params
  }
})

export const categoriesEditModalSlice = createSlice({
  name: 'categoriesEditModal',
  initialState: {
    modalIsOpen: false,
    categoriesId: 0,
    category: null,
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.categoriesId = action.payload.categoriesId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.category = action.payload.category
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = categoriesEditModalSlice.actions

export default categoriesEditModalSlice.reducer
