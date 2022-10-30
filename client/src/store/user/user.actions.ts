import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {IUser} from "../../utils/api/types";
import {RootState} from "../index";

export const getMe = createAsyncThunk<IUser, string>(
    'user/profile',
    async (token, thunkAPI) => {

        const res = await userAPI.getMe(token)

        return res[0]
    }
)

export const updateMe = createAsyncThunk<IUser, IUser, {state: RootState}>(
    'user/update',
    async (UserData, thunkAPI) => {
        const token = thunkAPI.getState().auth.token || ''
        return await userAPI.updateMe(UserData, token)
    }
)

export const deleteMe = createAsyncThunk<IUser, string>(
    'user/delete',
    async (token, thunkAPI) => {
        const res = await userAPI.deleteMe(token)
    }
)