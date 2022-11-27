import {IOnlineItemType} from "./onlineItem.types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IOnlineItemType = {
    id: '',
    itemType: ''
}

export const onlineItemSlice = createSlice(
    {
        name: 'onlineItem',
        initialState,
        reducers: {
            setItemType(state, action) {
                state.itemType = action.payload
            },
            setItemId(state, action) {
                state.id = action.payload
            }
        }
    }
)

export const {setItemType, setItemId} = onlineItemSlice.actions

export default onlineItemSlice.reducer