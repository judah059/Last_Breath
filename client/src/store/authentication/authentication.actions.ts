import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {IReqUser, IResUser, IUser} from "../../utils/api/types";
import {AppDispatch} from "../index";
import {setEmptyUser} from "../user/user.slice";
import {setWithExpiry} from "../../utils/localStorage";
import {getMe} from "../user/user.actions";
import {setToken} from "./authentication.slice";

import {AxiosError} from "axios";


export const registration = createAsyncThunk<IUser, IUser>(
    'user/register',
    async (userData, thunkAPI) => {
        const response = await userAPI.register(userData);

        const {email, password} = userData

        const resLogin = await userAPI.login({email, password})

        const expiredTime = 30 * 24 * 60 * 60

        setWithExpiry('access_token', resLogin.access, expiredTime)

        thunkAPI.dispatch(setToken(resLogin.access))

        return response
    }
)

interface ResErrors {
    json: string | ''
}

export const login = createAsyncThunk<IResUser, IReqUser, {
    rejectValue: string
}>(
    'user/login',
    async (authData, thunkAPI) => {

        try {

            const {rememberMe, email, password} = authData
            const response = await userAPI.login({email, password})
            const expiredTime = rememberMe ? (30 * 24 * 60 * 60) : 5000
            setWithExpiry('access_token', response.access, expiredTime)

            thunkAPI.dispatch(getMe(response.access))

            return response
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


export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setEmptyUser())
    localStorage.removeItem('access_token')
}


