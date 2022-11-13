import {UserState} from "../user/user.types";
import {createSlice} from "@reduxjs/toolkit";
import {getMe, updateMe} from "../user/user.actions";
import {registration} from "../authentication/authentication.actions";
import {ICinemaStore} from "./cinema.type";

const initialState: ICinemaStore = {
   id: 0,
   name: '',
   location_name: ""
}


export const cinemaSlice = createSlice({
   name: 'session',
   initialState,
   reducers: {
      setCinemaId(state, action) {
         state.id = action.payload
         state.name = action.payload
         state.location_name = action.payload
      }
   }

})

export const {setCinemaId} = cinemaSlice.actions;

export default cinemaSlice.reducer;