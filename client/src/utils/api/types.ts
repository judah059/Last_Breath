export interface IMovieItem {
    id: string
    imageUrl: string
    name: string
}

export interface ICinema {
    id: string
    city: string
    cinemaName: string
    cinemaStreet: string
}

export interface IReqUser {
    email: string
    password: string
}


export interface IResUser {
    refresh: string
    access: string
}

