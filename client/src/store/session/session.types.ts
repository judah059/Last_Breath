export interface ISeat {
    id: number
    is_free: boolean
    seat_additional_price: number,
    seat_id: number
    seat_number: number,
}

export interface ISession {
    id: number,
    date: string,
    start_time: string,
    end_time: string,
    base_price: number,
    movie: number,
    movie_name: string,
    movie_poster: string,
    cinemahall: number,
    cinemahall_detail: {
        id: number,
        number: number,
        cinema: number,
        cinema_name: string
    },
    rows: IRow[]
}

export interface IRow {
    id: number
    number: number
    seats: ISeat[]
}

export interface ISessionState {
    current: ISession | null
    order: IOrder | null
    ticket: ITicket[]
    snack: ISnack[]
    snackOrder: ISnack[]
    snackIndex: number
    city: string,
}

export interface ITicket {
    id:number
    seat_id: number
    seat_number: number,
    seat_row: number
    price: number
}

export interface ISnack {
    index: number
    id: number
    name: string
    logo: string
    price: number
    cinema: number
}

export interface IOrder {
    tickets: ITicket[]
    snackOrder: ISnack[]
    session: ISession
    city: string
}