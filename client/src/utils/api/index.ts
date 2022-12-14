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
    baseURL: 'https://lbdeploy-production.up.railway.app/api',
})

export let API = {
    getCinemaMovies() {
        return baseApi2.get('/offline/filmlist/').then(res => res.data)
    },
    getCinemaMovie(id: string | undefined) {
        return baseApi2.get(`/offline/film/${id}`).then(res => res.data)
    },
    getSession(cinemaId?: string, date?: Date) {
        return baseApi2.get(`/offline/session/filter/session/?cinema=${cinemaId}&date=${date}`).then(res => res.data)
    },
    getSessionById(id: number) {
        return baseApi2.get<ISession>(`/offline/session/${id}`).then(res => res.data)
    },
    getSnackByCinemaID(id: number | undefined) {
        return baseApi2.get<ISnack>(`/offline/filter/snack/${id}`).then(res => res.data)
    },
    getCinemas() {
        return baseApi2.get<ICinema[]>(`/offline/cinema/`).then(res => res.data)
    },
    getSessionByDate(data: IReqSessionByDate) {
        return baseApi2.get(`/offline/filter/session/`, {params: data}).then(res => res.data)
    },
    getCinema(id: string) {
        return baseApi2.get<ICinema>(`/offline/cinema/${id}/`).then(res => res.data)
    },
    postTicket(data: { session_seat?: number, session?: number }) {
        const tk = getWithExpiry('access_token')
        return baseApi2.post(`/offline/ticket/`, data, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    getTicket() {
        const tk = getWithExpiry('access_token')
        return baseApi2.get<IResTicket[]>(`/offline/ticket/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    postSnack(data: { amount: number, snack: number, user: number }) {
        const tk = getWithExpiry('access_token')
        return baseApi2.post(`/offline/bought_snack/`, data, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    getBoughtSnacks() {
        const tk = getWithExpiry('access_token')
        return baseApi2.get<IResSnack[]>(`/offline/bought_snack/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    removeBoughtSnack(id: number) {
        const tk = getWithExpiry('access_token')
        return baseApi2.delete(`/offline/bought_snack/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    removeTicket(id: number) {
        const tk = getWithExpiry('access_token')
        return baseApi2.delete(`/offline/ticket/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    getPayment() {
        const tk = getWithExpiry('access_token')
        return baseApi2.get<IResPayment[]>(`/user/payment/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    postPayment(token?: string) {
        const tk = getWithExpiry('access_token')
        return baseApi2.post(`/user/payment/`, {token}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    postTransaction(payment: number) {
        const tk = getWithExpiry('access_token')
        return baseApi2.post(`/offline/transaction/`, {payment}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },

    getOnlineMovie(id?: string) {
        return baseApi2.get<IOnlineMovie>(`/online/watch/film/${id}/`, {
            headers: {
                Authorization: "Bearer " + cookieToken
            }
        }).then(res => res.data);
    },
    getSerial(id: string, itemType: string) {
        const tk = getWithExpiry('access_token')
        let type;
        if (!itemType) {
            type = localStorage.getItem('onlineType')
        } else {
            type = itemType
        }
        return baseApi2.get<IOnlineMovie>(`/online/watch/${type}/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    deletePayment(id: number) {
        const tk = getWithExpiry('access_token')

        return baseApi2.delete(`/offline/payment/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    getSubs() {
        return baseApi2.get<ISub[]>(`/online/subscription/`,).then(res => res.data);
    },
    postClientSub(id?: number) {
        const tk = getWithExpiry('access_token')

        return baseApi2.post(`/online/client-subscription/`, {subscription: id}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    getUserSub() {
        const tk = getWithExpiry('access_token')

        return baseApi2.get<IUserSub[]>(`/online/client-subscription/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    deleteUserSub(id: number) {
        const tk = getWithExpiry('access_token')

        return baseApi2.delete(`/online/client-subscription/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    postFilmComment({comment_type, comment_text, film}: IReqComment) {
        const tk = getWithExpiry('access_token')
        return baseApi2.post<IComment>(`/online/commentfilm/`, {comment_type, comment_text, film}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    deleteFilmComment(id?: string) {
        const tk = getWithExpiry('access_token')
        return baseApi2.delete(`/online/commentfilm/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    updateFilmComment({comment_type, comment_text, film}: IReqComment, id?: string){
        const tk = getWithExpiry('access_token')

        return baseApi2.put(`/online/commentfilm/${id}/`, {comment_type, comment_text, film}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    postSerialComment({comment_type, comment_text, serial}: IReqSerialComment) {
        const tk = getWithExpiry('access_token')

        return baseApi2.post<IComment>(`/online/commentserial/`, {comment_type, comment_text, serial}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    updateSerialComment({comment_type, comment_text, serial}: IReqSerialComment, id?: string){
        const tk = getWithExpiry('access_token')

        return baseApi2.put(`/online/commentserial/${id}/`, {comment_type, comment_text, serial}, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
    deleteSerialComment(id?: string) {
        const tk = getWithExpiry('access_token')
        return baseApi2.delete(`/online/commentserial/${id}/`, {
            headers: {
                Authorization: "Bearer " + tk
            }
        }).then(res => res.data);
    },
}

export let userAPI = {
    login(data: IReqUser) {
        return baseApi2.post<IResUser>(`/user/token/`, data).then(res => res.data);
    },

    register(data: IUser) {
        return axios.post<IUser>(`https://lbdeploy-production.up.railway.app/api/user/registration/`, data).then(res => res.data);
    },

    getMe(token?: string) {
        return baseApi2.get<IUser[]>(`/user/profile/`, {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data);
    },

    updateMe(data: IUser, token?: string) {
        return baseApi2.put<IUser>('/user/profile/', data, {
                headers: {
                    Authorization: "Bearer " + token || cookieToken
                }
            }
        ).then(res => res.data)
    },

    deleteMe(token?: string) {
        return baseApi2.delete('/user/profile/', {
            headers: {
                Authorization: "Bearer " + token || cookieToken
            }
        }).then(res => res.data)
    },

    updatePassword(data: IChangePassword, token?: string) {
        return baseApi2.put<string>('/user/change_password/', data, {
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