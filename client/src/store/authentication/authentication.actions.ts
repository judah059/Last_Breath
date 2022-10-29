import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {IReqUser, IResUser, IUser} from "../../utils/api/types";
import Cookie from "cookie-universal";
import {AppDispatch} from "../index";
import {setEmptyUser} from "../user/user.slice";

const cookies = Cookie();


export const register = createAsyncThunk<IUser, IUser>(
    'user/register',
    async (userData, thunkAPI) => {
        return await userAPI.register(userData);
    }
)

export const login = createAsyncThunk<IResUser, IReqUser>(
    'user/login',
    async (authData, thunkAPI) => {

        const response = await userAPI.login(authData)

        cookies.set('access_token', response.access, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60
        })
        return response
    }
)


export const logout = () => (dispatch:AppDispatch) => {
    dispatch(setEmptyUser())
    cookies.remove('access_token');
}


