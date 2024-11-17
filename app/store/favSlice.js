import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'

export const favSlice = createSlice({
  name: 'favorites',
  initialState: {
    value: []
  },
  reducers: {
    setFavs: (state, action) => {
      state.value = action.payload;
    },    
  }
})

export const { setFavs } = favSlice.actions;

export const initializeFavs = () => async (dispatch) => {
  try {
    const storedDocs = JSON.parse(await AsyncStorage.getItem('fav_documents')) ?? [];
    dispatch(setFavs(storedDocs));    
  } catch (error) {
    console.error('Favori verisi alınamadı:', error);
  }
};

export const addToFav = (item) => async (dispatch) => {
  var storedDocs = JSON.parse(await AsyncStorage.getItem('fav_documents')) ?? [];
  storedDocs = [...storedDocs, item];
  await AsyncStorage.setItem("fav_documents", JSON.stringify(storedDocs));
  dispatch(setFavs(storedDocs));
}

export const removeFromFav = (item) => async (dispatch) => {
  var storedDocs = JSON.parse(await AsyncStorage.getItem('fav_documents')) ?? [];
  storedDocs = storedDocs.filter(doc => doc.path !== item.path);

  await AsyncStorage.setItem("fav_documents", JSON.stringify(storedDocs));
  dispatch(setFavs(storedDocs));
}

export default favSlice.reducer