

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: string;
}

export const signUpUser = createAsyncThunk<UserState, UserState>(
    
  'userdetails/signUpUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
        const request = axios.post("https://django.aakscience.com/signup/",userCredentials)
      console.log(request);
      localStorage.setItem('user', JSON.stringify(userCredentials));
      return userCredentials;
    } catch (error) {

      return rejectWithValue('An error occurred');
    }
  }
);

const initialState: UserState = {
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  user_type: '',
};

const authSlice = createSlice({
  name: 'userdetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<UserState>) => {
        const { username, first_name, last_name, email, password, user_type } = action.payload;
        state.username = username;
        state.first_name = first_name;
        state.last_name = last_name;
        state.email = email;
        state.password = password;
        state.user_type = user_type;
      });

  },
});

export default authSlice.reducer;
