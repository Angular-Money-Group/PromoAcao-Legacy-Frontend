// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import { axiosInstance as axios } from '@utils'

export const getInventory = createAsyncThunk('inventory/getData', async (params) => {
  const response = await axios.get(`/api/inventories/${params.inventoryId}`, params)

  return {
    inventory: response.data[0],
    params
  }
})

export const getCategories = createAsyncThunk('inventory/categories', async (ship_id) => {
  const response = await axios.get(`/api/ships/${ship_id}/cabin/categories`)

  return {
    categories: response.data?.data
  }
})

export const inventoryEditModalSlice = createSlice({
  name: 'inventoryEditModal',
  initialState: {
    modalIsOpen: false,
    inventoryId: 0,
    inventory: null,
    categories: [],
    isLoading: false,
    params: {}
  },
  reducers: {
    handleEditModal: (state, action) => {
      state.modalIsOpen = action.payload.onOpen
      state.inventoryId = action.payload.inventoryId
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getInventory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getInventory.fulfilled, (state, action) => {
        state.inventory = action.payload.inventory
        state.params = action.payload.params
        state.isLoading = false
      })
      .addCase(getInventory.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories
        state.isLoading = false
      })
      .addCase(getCategories.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export const {
  handleEditModal
} = inventoryEditModalSlice.actions

export default inventoryEditModalSlice.reducer
