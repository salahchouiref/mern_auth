import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    loading : false,
    error : false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers :{
        signInStart : (state) => {
            state.loading = true;
        },
        signInSuccess : (state,action) => {
            state.loading = false;
            state.currentUser = action.payload; 
            state.error = false;
        },
        signInFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart : (state) => {
            state.loading = true;
        },
        updateUserSuccess : (state,action) => {
            state.loading = false;
            state.currentUser = action.payload; 
            state.error = false;
        },
        updateUserFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart : (state) => {
            state.loading = true;
        },
        deleteUserSuccess : (state) => {
            state.loading = false;
            state.currentUser = null; 
            state.error = false;
        },
        deleteUserFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut : (state) => {
            state.loading = false;
            state.currentUser = null; 
            state.error = false;
        }
    }
});

export const {signInStart,signInSuccess,
              signInFailure,updateUserStart,
              updateUserSuccess,updateUserFailure,
              deleteUserStart,deleteUserSuccess,deleteUserFailure,
              signOut
            }= userSlice.actions;
export default userSlice.reducer;