import {ISessionState} from "./session.types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ISessionState = {
    current: null,
    order: null,
    ticket: [],
    snack: [],
    snackOrder: []
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
        setSnack(state, action) {
            state.snack = action.payload
        },
        setSnackOrder(state, action) {
            state.snackOrder = [...state.snackOrder, action.payload]
        },

        setRemoveSnack(state, action) {
            state.snack = state.snack.filter(s => +s.id !== action.payload)
        }
    }
})

export const {setSessionById, setSnack, setRemoveSnack, setTicket, setRemoveTicket} = sessionSlice.actions;

export default sessionSlice.reducer;