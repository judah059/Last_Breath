import {ISessionState} from "./session.types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ISessionState = {
    current: null,
    order: null,
    ticket: []
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionById(state, action) {
            state.current = action.payload
        },
        // setTicketOrder(state, action) {
        //     state.order!.ticket = action.payload
        // },
        setTicket(state, action) {
            state.ticket = [...state.ticket, action.payload]
        },
        setRemoveTicket(state, action){
            state.ticket = state.ticket.filter(s=> +s.seat_id !== action.payload)
        },
        setSnackOrder(state, action) {
            state.order!.snack = action.payload
        },
        setOrder(state, action) {
            state.order = action.payload
        }
    }
})

export const {setSessionById, setSnackOrder, setOrder, setTicket, setRemoveTicket} = sessionSlice.actions;

export default sessionSlice.reducer;