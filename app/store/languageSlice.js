// store/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  lang: "tr",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      AsyncStorage.setItem("appLang", action.payload); // dili kalıcı olarak sakla
    },
    loadLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLanguage, loadLanguage } = languageSlice.actions;
export default languageSlice.reducer;