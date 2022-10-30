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
    email?: string
    password?: string
    rememberMe?: boolean
}


export interface IResUser {
    refresh: string
    access: string
}

export interface IUser {
    username?: string
    first_name?: string
    last_name?: string
    birth_date?: string
    role?: string
    email?: string
    password?: string
}

export interface DateOfBirth {
    month: string
    day: string
    year: string
}
