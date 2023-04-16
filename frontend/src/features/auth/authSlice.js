import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
// async thunk function -that deal with async data backend

// Get user which contain basic user data and a token  from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};
//register user

// 'auth/register' is action user is passed in from register component  and dispatch register form there

export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    //make a request
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// get   auser
export const getUser=createAsyncThunk('auth/getUser',async(id,thunkAPI)=>{
  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token);
    return await authService.getUser(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    return message
  }
})



// logut user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});








// make slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })

      // fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      //rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // case for logut
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
// case for getting user

//  .addCase(getUser.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getUser.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload;
//       })
//       .addCase(getUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.user = null;
//       })





  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
