import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";

export const getMe = createAsyncThunk(
    'user/profile',
    async () => {
        return await userAPI.getMe()
    }
)