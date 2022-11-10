// this where our reducers and our initial state go that pertain to our authentication
// we are going to have a register, login, and logout that will clear local storage

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'  // thunk for synchronous function and then update your state with what you get back from server

// when user log in we get back a json token to access protected routes so we going to save it to local storage
//Get user from local storage, local storage has strings so want to parse it, then we can get it with localstorage.getItem, and the item we looking for is user
const user = JSON.parse(localStorage.getItem('user'))

//initial state for user authentication

const initialState = {
  user: user ? user : null,  // if there is a user in local storage then im going to use that, else this will be null
  isError: false, // if we get an error back from the server, we can set to true and show an error message
  isSuccess: false,
  isLoading: false, // to show a spinner animation effect
  message: ''
}
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
    reset:(state) => {     //  after we register, we can reset() function to reset these values back to false
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: () => {}
})

export const {reset} = authSlice.actions   // so we can bring reset to our components 
export default authSlice.reducer          //  need to import to store.js