import exp from "constants";

export interface IMovieItem {
    id: string
    name: string
    poster: string
}

export interface ITestMovieItem {
    "id": string,
    "name": string,
    "video": string,
    "poster": string,
    "trailer": string,
    "premier": string,
    "release_date": string,
    "length": string,
    "cast": string,
    "ageLimit": string,
    "producer": string,
    "language": string,
    "country": string
}





export interface ISession {
    "base_price": number,
    "cinemahall": number,
    "cinemahall_detail": {
        "cinema": number
        "cinema_name": string
        "id": number
        "number": number

    },
    "date": string,
    "end_time": string,
    "id": number,
    "movie": number,
    "movie_name": number,
    "movie_poster": number,
    "seats": Array<object>,
    "start_time":string
}
export interface niceBackEnd {
    "cinema" : string,
    "time" : string,
}
export interface ICinema {
    "id": number,
    "name": string,
    "location": 1,
    "location_details": {
        "id": number,
        "city": string,
        "street": string,
        "number": number
    },
    "cinemahall": [
        {
            "id": number,
            "number": number,
            "cinema": number,
            "cinema_name": string
        }
    ]
}

export interface IReqUser {
    email?: string
    password?: string
    rememberMe?: boolean
}

export interface IReqSessionByDate {
    date?: string
    cinema?: number
}
export interface IResUser {
    refresh: string
    access: string
}

export interface ISessionItem {
    label: string,
    dates: Array<string>
}
export interface ISessionByDate {
    "id": number,
    "halls": [
    {
        "id": number,
        "number": number,
        "sessions": [
            {
                "id": number,
                "date": string,
                "start_time": string,
                "end_time": string,
                "base_price": number,
                "movie": number,
                "cinemahall": number,
                "seats": []
            }
        ]
    }]




    // "id": number,
    // "number": number,
    // "cinema": number,
    // "cinema_name": string,
    // "sessions":  [
    //     {
    //         "id": number,
    //         "date": string,
    //         "start_time": string,
    //         "end_time": string,
    //         "base_price": number,
    //         "movie": number,
    //         "movie_name": string,
    //         "movie_poster": string,
    //         "cinemahall": number,
    //         "cinemahall_detail": {
    //             "id": number,
    //             "number": number,
    //             "cinema": number
    //             "cinema_name": string
    //         },
    //         "seats": []
    //     }
    // ]
}
export interface ISessionEmptyArray {
            "id": number,
            "date": string,
            "start_time": string,
            "end_time": string,
            "base_price": number,
            "movie": number,
            "cinemahall": number,
            "seats": []


}
export interface IHall {
            "id": number,
            "number": number,
            "sessions": [
                {
                    "id": number,
                    "date": string,
                    "start_time": string,
                    "end_time": string,
                    "base_price": number,
                    "movie": number,
                    "cinemahall": number,
                    "seats": []
                }
            ]
}
export interface IUser {
    id?: number
    username?: string
    first_name?: string
    last_name?: string
    birth_date?: string
    role?: string
    email?: string
    password?: string
}

// export interface ISessionDictionary {
//     label: string,
//     sessions: [
//         {
//             "id": number,
//             "date": string,
//             "start_time": string,
//             "end_time": string,
//             "base_price": number,
//             "movie": number,
//             "movie_name": string,
//             "movie_poster": string,
//             "cinemahall": number,
//             "cinemahall_detail": {
//                 "id": number,
//                 "number": number,
//                 "cinema": number
//                 "cinema_name": string
//             },
//             "seats": []
//         }
//     ]
// }

export interface DateOfBirth {
    month: string
    day: string
    year: string
}

export interface IChangePassword {
    old_password: string
    password: string
    password2: string
}

export interface iChangePayment {
    card_number: string
    expiration_date: string
    cvv: number
}

export interface IResTicket {
    id: number
    total_price: number
    is_payed: boolean
    session: number
    session_seat: number
    seat_detail: {
        id: number
        seat_id: number
        seat_number: number
        seat_row: number
        seat_additional_price: number
        is_free: boolean
    }
    session_detail: {
        id: number
        date: string
        start_time: string
        end_time: string
        base_price: number
        movie: number
        movie_name: string
        movie_poster: string
        cinemahall: number
        cinemahall_detail: {
            id: number
            number: number
            cinema: number
            cinema_name: string
        }
    }
}

export type IResSnack = {
    id: number
    amount: number
    is_payed: boolean
    snack: number
    snack_detail: {
        id: number
        name: string
        logo: string
        price: number
        cinema: number
    }
    total_price: number
    user: number
}

export type IResPayment = {
    id: number
    user: {
        id: number
        username: string
        first_name: string
        last_name: string
        birth_date: any
        role: string
        email: string
    }
    card_type: string
    last_4: string
    expire_date: string
    stripe_id: string
}

export interface ISeries {
    id: number
    number: number
    video: string
    season: number
}

export interface ISerial{
    seasons: Array<{
        number: number
        series: Array<ISeries>
    }>
}

export interface IOnlineMovie extends ISerial{
    id: number
    name: string
    video: string
    poster: string
    trailer: string
    premier: string
    release_date: string
    length: number
    cast: string
    ageLimit: string
    producer: string
    language: string
    country: string
    main_genre: string
    genre_list: Array<string>
}