import {createAsyncThunk} from "@reduxjs/toolkit";
import {userAPI} from "../../utils/api";
import {ICreateUser, IReqUser, IResUser} from "../../utils/api/types";


export const login = createAsyncThunk<IResUser, IReqUser>(
    'user/login',
    async (authData, thunkAPI) => {
        return await userAPI.login(authData);
    }
)


export const register = createAsyncThunk<ICreateUser, ICreateUser>(
    'user/register',
    async (userData, thunkAPI) => {
        return await userAPI.register(userData);
    }
)