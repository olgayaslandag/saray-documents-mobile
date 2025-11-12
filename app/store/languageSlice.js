import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization"; // cihaz dili için

const locale = Localization.locale ?? "en";
const deviceLang = locale.startsWith("tr") ? "tr" : "en";

const initialState = {
  lang: deviceLang,
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