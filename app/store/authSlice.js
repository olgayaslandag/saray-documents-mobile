import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  value: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
    clearUser: (state) => {
      state.value = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export const initializeAuth = () => async (dispatch) => {
  try {
    const storedUser = JSON.parse(await AsyncStorage.getItem('user')) ?? null;
    dispatch(setUser(storedUser));    
  } catch (error) {
    console.error('Kullanıcı verisi alınamadı:', error);
  }
};

export const clearAuth = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user')
    dispatch(clearUser());
  } catch (error) {
    console.error('Kullanıcı verisi alınamadı:', error);
  }
};


export const login = (userData) => async (dispatch) => {
  try {    
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData));
  } catch (error) {
    console.error('Veri alınırken hata:', error);
  }
};



export default authSlice.reducer;
