import {ISessionState} from "./session.types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: ISessionState = {
    current: null,
    order: null,
    ticket: [],
    snack: [],
    snackOrder: [],
    snackIndex: 0,
    city: '',
}

export const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessionById(state, action) {
            state.current = action.payload
        },
        setTicket(state, action) {
            state.ticket = [...state.ticket, action.payload]
        },
        setEmptyTicket(state){
            state.ticket = []
        },
        setRemoveTicket(state, action) {
            state.ticket = state.ticket.filter(s => +s.seat_id !== action.payload)
        },
        setSnack(state, action) {
            state.snack = action.payload
        },
        setSnackOrder(state, action) {
            state.snackIndex += 1
            let obj={
                index: state.snackIndex,
                ...action.payload
            }
            state.snackOrder = [...state.snackOrder, obj]
        },
        setRemoveSnackOrder(state, action) {
            state.snackIndex -= 1
            console.log(state.snackOrder.filter(s => +s.index !== +action.payload))
            state.snackOrder = state.snackOrder.filter(s => +s.index !== +action.payload)
        },
        setOrder(state, action){
            state.order = action.payload
        },
        setCity(state, action){
            state.city= action.payload
        },
    }
})

export const {
    setSessionById,
    setSnack,
    setSnackOrder,
    setRemoveSnackOrder,
    setTicket,
    setRemoveTicket,
    setOrder,
    setCity,
    setEmptyTicket,
} = sessionSlice.actions;

export default sessionSlice.reducer;