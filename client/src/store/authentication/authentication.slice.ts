import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "./authentication.types";
import {login} from "./authentication.actions";

const initialState: UserState = {
    token: null,
    refresh: null,
    data: null,
    isLoading: false
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.data = action.payload;
        }
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

export default userSlice.reducer;