import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";

export const getMe = createAsyncThunk(
    'user/profile',
    async (thunkAPI) => {

        const res = await userAPI.getMe()

        return res[0]
    }
)