import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {IUser} from "../../utils/api/types";
import {RootState} from "../index";
import {AxiosError} from "axios";

interface ResErrors {
    json: string | ''
}

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

        try {
            const token = thunkAPI.getState().auth.token || ''
            return await userAPI.updateMe(UserData, token)
        } catch (err: any) {
            let error: AxiosError<ResErrors> = err // cast the error for access

            if (!error.response) {
                throw error
            }

            const errorMsg = error.response.data
            const json = JSON.stringify(errorMsg)

            return thunkAPI.rejectWithValue(json)
        }
    }
)

export const deleteMe = createAsyncThunk<IUser, IUser, {state: RootState}>(
    'user/delete',
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.token || ''

        const res = await userAPI.deleteMe(token)

        return res[0]
    }
)