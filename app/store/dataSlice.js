import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    value: []
  },
  reducers: {
    synchronize: (state, action) => {
        state.value = action.payload;
    },    
  }
})

export const { synchronize } = dataSlice.actions

export default dataSlice.reducer