// this where our reducers and our initial state go that pertain to our authentication
// we are going to have a register, login, and logout that will clear local storage
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// when user log in we get back a json token to access protected routes so we going to save it to local storage
// Get user from local storage, local storage has strings so want to parse it, then we can get it with localstorage.getItem, and the item we looking for is user
const user = JSON.parse(localStorage.getItem('user'))

//initial state for user authentication
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

// create actual slice, store it in export variable authSlice and set this createslice which we brought it above
// and that gets passed in an object, and in this object we are going to have a 
// name for our slice called auth
// second thing we pass in is the initialState which we defined above
// third thing we define is reducers so any functions we pass in are not going to asynchronous, they are not thunk functions
// fourth thing we define is extrareducers for our thunk function
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions      // so we can bring reset to our components 
export default authSlice.reducer                //  need to import to store.js