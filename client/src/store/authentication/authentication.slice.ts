import {createSlice} from "@reduxjs/toolkit";
import {AuthState} from "./authentication.types";
import {login} from "./authentication.actions";

const initialState: AuthState = {
    token: null,
    refresh: null,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isLoading = false;
        });
    }
})

// export const {setUser} = userSlice.actions;

export default authSlice.reducer;