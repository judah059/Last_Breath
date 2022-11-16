import axios from "axios";
import {
    IChangePassword,
    ICinema,
    IReqSessionByDate,
    IReqUser,
    IResPayment,
    IResSnack,
    IResTicket,
    IResUser,
    IUser
} from "./types";
import {getWithExpiry} from "../localStorage";
import {ISession, ISnack} from "../../store/session/session.types";


const cookieToken = getWithExpiry('access_token')

let baseApi2 = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
})

export let API = {
    getCinemaMovies() {
        return baseApi2.get('filmlist/').then(res => res.data)
    },
    getCinemaMovie(id: string | undefined) {
        return baseApi2.get(`film/${id}`).then(res => res.data)
    },
    getSession(cinemaId?: string, date?: Date) {
        return baseApi2.get(`session/filter/session/?cinema=${cinemaId}&date=${date}`).then(res => res.data)
    },
    getSessionById(id: number) {
        return baseApi2.get<ISession>(`session/${id}`).then(res => res.data)
    },
    getSnackByCinemaID(id: number | undefined) {
        return baseApi2.get<ISnack>(`filter/snack/${id}`).then(res => res.data)
    },
    getCinemas() {
        return baseApi2.get<ICinema[]>(`cinema/`).then(res => res.data)
    },
    getSessionByDate(data: IReqSessionByDate) {
        return baseApi2.get(`filter/session/`, {params: data}).then(res => res.data)
    },
    getCinema(id: string) {
        return baseApi2.get<ICinema>(`cinema/${id}/`).then(res => res.data)
    },
    postTicket(data: { session_seat?: number, session?: number }) {
        return baseApi2.post(`ticket/`, data, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getTicket() {
        return baseApi2.get<IResTicket[]>(`ticket/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postSnack(data: { amount: number, snack: number, user: number }) {
        return baseApi2.post(`bought_snack/`, data,).then(res => res.data);
    },
    getBoughtSnacks() {
        return baseApi2.get<IResSnack[]>(`bought_snack/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    removeBoughtSnack(id: number){
        return baseApi2.delete(`bought_snack/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    removeTicket(id: number){
        return baseApi2.delete(`ticket/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getPayment(){
        return baseApi2.get<IResPayment[]>(`payment/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postPayment(token?: string){
        return baseApi2.post(`payment/`,{token}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postTransaction(payment: number){
        return baseApi2.post(`transaction/`,{payment}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    }
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

    deleteMe(token?: string) {
        return baseApi2.delete('profile/', {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data)
    },

    updatePassword(data: IChangePassword, token?: string) {
        return baseApi2.put<string>('change_password/', data, {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data)
    }
}