import { createSlice } from '@reduxjs/toolkit'

export const docSelectSlice = createSlice({
  name: 'docSelect',
  initialState: {
    value: null
  },
  reducers: {
    docSelect: (state, action) => {
        state.value = action.payload;
    },    
  }
})

export const { docSelect } = docSelectSlice.actions

export default docSelectSlice.reducer