import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall } from '../services/apiBase';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await apiCall('post', '/auth/login', { email, password });
  return response;
});

export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await apiCall('post', '/auth/register', userData);
  return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await apiCall('post', '/auth/logout');
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {
  const response = await apiCall('get', '/auth/me');
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    setUser: (state, action) => {
  state.userData = action.payload;
  state.status = 'succeeded';
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = 'loading'; })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => { state.status = 'loading'; })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userData = null;
        state.status = 'idle';
      })
      .addCase(fetchCurrentUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.status = 'failed';
        state.userData = null;
      });
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;