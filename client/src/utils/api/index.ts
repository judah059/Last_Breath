import axios from "axios";
import {ICinema, ICreateUser, IReqUser, IResUser} from "./types";
import {register} from "../../store/authentication/authentication.actions";

let baseApi = axios.create({
    baseURL: 'https://6358280cc26aac906f3d1b80.mockapi.io/'
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
        return axios.post<IResUser>(`http://127.0.0.1:8000/api/token/`, data).then(res => res.data);
    },
    register(data: ICreateUser){
        return axios.post<ICreateUser>(`http://127.0.0.1:8000/api/registration/`, data).then(res => res.data);
    },


}