import axios from "axios";
import {IChangePassword, ICinema, IReqUser, IResUser, IUser} from "./types";
import {getWithExpiry} from "../localStorage";


let baseApi = axios.create({
    baseURL: 'https://6358280cc26aac906f3d1b80.mockapi.io/'
})

const cookieToken = getWithExpiry('access_token')

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export let API = {
    getCinemaMovies() {
        return baseApi2.get('filmlist/').then(res => res.data)
    },

    getCinemas(city = '') {
        return baseApi.get<ICinema[]>(`cinemas?city=${city}`).then(res => res.data)
    },
}

export let userAPI = {
    login(data: IReqUser) {
        return baseApi2.post<IResUser>(`token/`, data).then(res => res.data);
    },

    register(data: IUser) {
        return axios.post<IUser>(`http://127.0.0.1:8000/api/registration/`, data).then(res => res.data);
    },

    getMe(token?: string) {
        return baseApi2.get<IUser[]>(`profile/`, {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data);
    },

    updateMe(data: IUser, token?: string) {
        return baseApi2.put<IUser>('profile/', data, {
                headers: {
                    Authorization: "Bearer " + token || cookieToken
                }
            }
        ).then(res => res.data)
    },

    deleteMe(token?: string){
        return baseApi2.delete('profile/', {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data)
    },

    updatePassword(data: IChangePassword, token?: string){
        return baseApi2.put<string>('change_password/', data, {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data)
    }
}