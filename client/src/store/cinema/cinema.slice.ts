import {createSlice} from "@reduxjs/toolkit";
import {ICinemaStore} from "./cinema.type";

const initialState: ICinemaStore = {
    cinema: null,
    isCinemaPage: true
}


export const cinemaSlice = createSlice({
    name: 'cinema',
    initialState,
    reducers: {
        setCinema(state, action) {
            state.cinema = action.payload
        },
        setIsCinemaPage(state, action) {
            state.isCinemaPage = action.payload
        }
    }

})

export const {setCinema, setIsCinemaPage} = cinemaSlice.actions;

export default cinemaSlice.reducer;