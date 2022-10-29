import axios from "axios";
import {ICinema, IReqUser, IResUser, IUser} from "./types";
import Cookie from "cookie-universal";


const cookies = Cookie();
const cookieToken = cookies.get('access_token');

let baseApi = axios.create({
    baseURL: 'https://6358280cc26aac906f3d1b80.mockapi.io/'
})

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export let API = {
    getCinemaMovies() {
        return baseApi.get('cinemaMovies').then(res => res.data)
    },

    getCinemas(city = '') {
        return baseApi.get<ICinema[]>(`cinemas?city=${city}`).then(res => res.data)
    },
}


export let userAPI = {
    login(data: IReqUser) {
        return baseApi2.post<IResUser>(`token/`, data).then(res => res.data);
    },
    register(data: IUser){
        return baseApi2.post<IUser>(`registration/`, data).then(res => res.data);
    },

    getMe(){
        return baseApi2.get<IUser[]>(`profile/`,{
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    }
}