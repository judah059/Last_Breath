import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {IReqUser, IResUser, IUser} from "../../utils/api/types";
import {AppDispatch} from "../index";
import {setEmptyUser} from "../user/user.slice";
import {setWithExpiry} from "../../utils/localStorage";
import {getMe} from "../user/user.actions";



export const register = createAsyncThunk<IUser, IUser>(
    'user/register',
    async (userData, thunkAPI) => {
        return await userAPI.register(userData);
    }
)

export const login = createAsyncThunk<IResUser, IReqUser>(
    'user/login',
    async (authData, thunkAPI) => {

        const {rememberMe, email, password} = authData

        const response = await userAPI.login({email, password})

        const expiredTime = rememberMe ? (30 * 24 * 60 * 60) : 5000

        setWithExpiry('access_token', response.access, expiredTime)

        thunkAPI.dispatch(getMe(response.access))

        return response
    }
)


export const logout = () => (dispatch: AppDispatch) => {
    dispatch(setEmptyUser())
    localStorage.removeItem('access_token')
}


