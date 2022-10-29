import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "./user.types";
import {getMe} from "./user.actions";

const initialState: UserState = {
    username: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    role: '',
    email: '',
    isLoading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmptyUser(state) {
            state.username = '';
            state.first_name = '';
            state.last_name = '';
            state.birth_date = '';
            state.role = '';
            state.email = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.birth_date = action.payload.birth_date;
            state.role = action.payload.role;
            state.email = action.payload.email;
            state.isLoading = false;
        })
    }
})

export const {setEmptyUser} = userSlice.actions;

export default userSlice.reducer;