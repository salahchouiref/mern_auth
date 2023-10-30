import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentuser : null,
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
            state.currentuser = action.payload; 
            state.error = false;
        },
        signInFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {signInStart,signInSuccess,signInFailure} = userSlice.actions;
export default userSlice.reducer;