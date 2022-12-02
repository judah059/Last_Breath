import axios from "axios";
import {
    IChangePassword,
    ICinema, IComment,
    IOnlineMovie, IReqComment, IReqSerialComment,
    IReqSessionByDate,
    IReqUser,
    IResPayment,
    IResSnack,
    IResTicket,
    IResUser, ISub,
    IUser, IUserSub
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
    removeBoughtSnack(id: number) {
        return baseApi2.delete(`bought_snack/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    removeTicket(id: number) {
        return baseApi2.delete(`ticket/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getPayment() {
        return baseApi2.get<IResPayment[]>(`payment/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postPayment(token?: string) {
        return baseApi2.post(`payment/`, {token}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postTransaction(payment: number) {
        return baseApi2.post(`transaction/`, {payment}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },

    getOnlineMovie(id?: string) {
        return baseApi2.get<IOnlineMovie>(`online/watch/film/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getSerial(id: string, itemType: string) {
        let type;
        if (!itemType) {
            type = localStorage.getItem('onlineType')
        } else {
            type = itemType
        }
        return baseApi2.get<IOnlineMovie>(`online/watch/${type}/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    deletePayment(id: number) {
        return baseApi2.delete(`/payment/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getSubs() {
        return baseApi2.get<ISub[]>(`online/subscription/`,).then(res => res.data);
    },
    postClientSub(id: number) {
        return baseApi2.post(`online/client-subscription/`, {subscription: id}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getUserSub() {
        return baseApi2.get<IUserSub[]>(`online/client-subscription/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    deleteUserSub(id: number) {
        return baseApi2.delete(`online/client-subscription/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postFilmComment({comment_type, comment_text, film}: IReqComment) {
        return baseApi2.post<IComment>(`/online/commentfilm/`, {comment_type, comment_text, film}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    deleteFilmComment(id?: string) {
        return baseApi2.delete(`/online/commentfilm/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    updateFilmComment({comment_type, comment_text, film}: IReqComment, id?: string){
        return baseApi2.put(`/online/commentfilm/${id}/`, {comment_type, comment_text, film}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    postSerialComment({comment_type, comment_text, serial}: IReqSerialComment) {
        return baseApi2.post<IComment>(`/online/commentserial/`, {comment_type, comment_text, serial}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    updateSerialComment({comment_type, comment_text, serial}: IReqSerialComment, id?: string){
        return baseApi2.put(`/online/commentserial/${id}/`, {comment_type, comment_text, serial}, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    deleteSerialComment(id?: string) {
        return baseApi2.delete(`/online/commentserial/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
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

export let OnlineAPI = {
    getOnlineWatch() {
        return baseApi2.get('online/watch/').then(res => res.data)
    }
}