import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./authentication/authentication.slice";
import {userSlice} from "./user/user.slice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;