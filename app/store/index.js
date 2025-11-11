import { configureStore } from '@reduxjs/toolkit'
import dataSlice from "./dataSlice";
import docSelectSlice from "./docSelectSlice"
import searchItemsSlice from './searchItemsSlice';
import authSlice from './authSlice';
import favSlice from './favSlice';
import languageSlice from './languageSlice';

export default configureStore({
  reducer: {
    data: dataSlice,
    docSelect: docSelectSlice,
    searchItems: searchItemsSlice,
    auth: authSlice,
    favorites: favSlice,
    language: languageSlice
  }
})