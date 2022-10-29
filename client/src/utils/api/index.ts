import axios from "axios";
import {ICinema, ICreateUser, IReqUser, IResUser, IUser} from "./types";

let baseApi = axios.create({
    baseURL: 'https://6358280cc26aac906f3d1b80.mockapi.io/'
})

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY3MDY1MjM1LCJqdGkiOiJmOWJjMGZiOWE5NzM0NzljOWU3NTk0OWQyYjExNGI2YiIsInVzZXJfaWQiOjF9.5hJgnu3rBvap207gJpmSKWJkxhzGXfAEVtRK8Rzf2oU"
    }
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
    register(data: ICreateUser){
        return axios.post<ICreateUser>(`http://127.0.0.1:8000/api/registration/`, data).then(res => res.data);
    },

    getMe(){
        return baseApi2.get<IUser>(`profile/`).then(res => res.data);
    }
}