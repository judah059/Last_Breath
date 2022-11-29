import {IOnlineItemType} from "./onlineItem.types";
import {createSlice} from "@reduxjs/toolkit";

const initialState: IOnlineItemType = {
    id: '',
    itemType: '',
    isLoading: true
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
            },
            setIsLoading(state, action){
                state.isLoading = action.payload
            }
        }
    }
)

export const {setItemType, setItemId, setIsLoading} = onlineItemSlice.actions

export default onlineItemSlice.reducer