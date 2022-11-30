import {createSlice} from "@reduxjs/toolkit";
import {UserState} from "./user.types";
import {getMe, updateMe} from "./user.actions";
import {registration} from "../authentication/authentication.actions";

const initialState: UserState = {
    id: 0,
    username: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    role: '',
    email: '',
    isLoading: true,
    error: '',
    payment: []
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
        },
        setError(state, action) {
            state.error = action.payload
        },
        setPayment(state, action){
            state.payment = action.payload
        }

    },
    extraReducers: builder => {
        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.id = action.payload.id || 0;
            state.username = action.payload.username || '';
            state.first_name = action.payload.first_name || '';
            state.last_name = action.payload.last_name || '';
            state.birth_date = action.payload.birth_date || '';
            state.role = action.payload.role || '';
            state.email = action.payload.email || '';
            state.isLoading = false;
        })
        builder.addCase(updateMe.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(updateMe.fulfilled, (state, action) => {
            state.username = action.payload.username || '';
            state.first_name = action.payload.first_name || '';
            state.last_name = action.payload.last_name || '';
            state.birth_date = action.payload.birth_date || '';
            state.role = action.payload.role || '';
            state.email = action.payload.email || '';
            state.isLoading = false;
        })
        builder.addCase(updateMe.rejected, (state, action) => {
            state.error = 'Error';
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            state.username = action.payload.username || '';
            state.first_name = action.payload.first_name || '';
            state.last_name = action.payload.last_name || '';
            state.birth_date = action.payload.birth_date || '';
            state.role = action.payload.role || '';
            state.email = action.payload.email || '';
        });
    }
})

export const {setEmptyUser, setError, setPayment} = userSlice.actions;

export default userSlice.reducer;