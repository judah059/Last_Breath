import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./authentication/authentication.slice";


const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;