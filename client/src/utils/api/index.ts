import axios from "axios";

let baseApi = axios.create({
    baseURL: 'https://6358280cc26aac906f3d1b80.mockapi.io/'
})

export let API = {
    getCinemaMovies() {
        return baseApi.get('cinemaMovies').then(res => res.data)
    }
}