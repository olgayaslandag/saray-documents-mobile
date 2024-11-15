import { createSlice } from '@reduxjs/toolkit'

export const searchItemsSlice = createSlice({
  name: 'searchItems',
  initialState: {
    value: []
  },
  reducers: {
    searchlist: (state, action) => {
        state.value = action.payload;
    },    
  }
})

export const { searchlist } = searchItemsSlice.actions

export default searchItemsSlice.reducer