import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cinema.module.scss'
import mov from "../../assets/tempMovieImage.jpg";
import cinemaTemp from "../../assets/cinemaTemp.jpg";
import location from "../../assets/location.svg";
import {useParams} from "react-router-dom";
import {ICinema, IMovieItem, ISessionByDate, ITestMovieItem} from "../../utils/api/types";
import {API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {setCinema} from "../../store/cinema/cinema.slice";
import {RootState} from "../../store";
import Movie from "../MoviePage/Movie/Movie";
import * as events from "events";

interface CinemaProps {

}


const Cinema: React.FC<CinemaProps> = () => {

    const [inputValue, setInputValue] = useState<Date>();
    const [inputValues, setInputValues] = useState<Date[]>([]);
    const [sessionByDateAndCinema, setSessionByDateAndCinema] = useState<ISessionByDate>()
    const [movie, setMovie] = useState<ITestMovieItem | undefined>(undefined);
    const {id} = useParams() as { id: string };
    const [currCinema, setCurrCinema] = useState<ICinema>()
    const dispatch = useAppDispatch();
    const {cinema, isCinemaPage} = useAppSelector((state: RootState) => state.cinema);
    const [dateNumber, setDateNumber] = useState<number>(0)
    const [movies, setMovies] = useState<IMovieItem[]>([])
    const [noHalls, setNoHallse] = useState<Boolean>(false)
    const div0 = useRef<HTMLDivElement | null>(null)

    const fetchMovies = async () => {
        try {
            const movies = await API.getCinemaMovies();
            setMovies(movies);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const fetchDate = async () => {
        let dates = []
        let multiplier = 0
        for (let i = 0; i < 9; i++, multiplier++) {
            dates.push(new Date(Date.now() + ((3600 * 1000 * 24) * multiplier)))
        }
        await setInputValues(dates);
    }

    const fetchCinema = async () => {
        try {
            const cinema = await API.getCinema(id);
            setCurrCinema(cinema)
            dispatch(setCinema(cinema))

            const sessions = await API.getSession(id)

        } catch (e) {
            console.log(e)
        }
    }
    const handleClick = (event : Event)  => {
        // 👇️ toggle class on click
        // event?.currentTarget?.classList.toggle(`${s.dayBlock}`);

        // 👇️ add class on click
        // event.currentTarget.classList.add('bg-salmon');

        // 👇️ remove class on click
        // event.currentTarget.classList.remove('bg-salmon');
    };
    const a =() => {

    }
    const switchSession = async (divNumber : number) => {
        if (divNumber === dateNumber) return;
        setDateNumber(divNumber)
    }
    const fetchSessionBy = async (date: string) => {
        const movie: ITestMovieItem = await API.getCinemaMovie(id);
        setMovie(movie)
        const sessionsByDate: ISessionByDate[] = await API.getSessionByDate({date: date, cinema: cinema?.id});
        let sessionByDate: ISessionByDate = sessionsByDate[0];
        let hallsLength = sessionByDate.halls.length
        let counter = 0
        for (let i = 0; i < sessionByDate.halls.length; i++) {
            if (sessionByDate.halls[i].sessions.every(element => element === null)) {
                counter++
                if (hallsLength === counter) {
                    setNoHallse(true)
                    console.log("No halls true")
                    break;
                } else continue;

            }

            for (let j = 0; j < sessionByDate.halls[i].sessions.length; j++) {
                if (movie && sessionByDate.halls[i].sessions[j]?.movie != +movie?.id) {
                    sessionByDate.halls[i].sessions.splice(j, 1)
                    j--;
                }
            }
        }
        if (hallsLength !== counter) setNoHallse(false);

        for (let i = 0; i < sessionByDate.halls.length; i++) {
            for (let j = 0; j < sessionByDate.halls[i].sessions.length; j++) {
                if ((sessionByDate.halls[i].sessions[j] && sessionByDate.halls[i].sessions[j + 1]) && (Number(sessionByDate.halls[i].sessions[j]?.start_time.substring(0, 2)) > Number(sessionByDate.halls[i].sessions[j + 1]?.start_time.substring(0, 2)))) {
                    let temp = sessionByDate.halls[i].sessions[j];
                    sessionByDate.halls[i].sessions[j] = sessionByDate.halls[i].sessions[j + 1];
                    sessionByDate.halls[i].sessions[j + 1] = temp;
                }
            }
        }

        await setSessionByDateAndCinema(sessionByDate)
        console.log(sessionByDate)
    }

    useEffect(() => {
        fetchDate()
        fetchCinema()
        fetchSessionBy(new Date().toISOString().substring(0, 10))
        fetchMovies()
        return () => {
            dispatch(setCinema(null))
        }
    }, [id])



    // @ts-ignore
    return (
        <>
            <HeaderDrawer toLinkText='Cinema Name'/>
            <div className={s.container}>
                <div className={s.top}>
                    <img src={cinemaTemp} alt="cinema" className={s.mainImage}/>
                    <div className={s.title}>
                        <h2>Cinema</h2>
                        <h2>{currCinema?.name}</h2>
                    </div>
                    <div className={s.location}>
                        <img src={location} alt="location"/>
                        <div className={s.info}>
                            <p>{currCinema?.location_details.street} {currCinema?.location_details.number}</p>
                            <p>{currCinema?.location_details.city}</p>
                        </div>
                    </div>
                </div>
                <div className={s.dayList}>
                    {/*{inputValues.map((x, index) => <div*/}
                    {/*    className={`${s.dayBlock} ${s.active}`}>*/}
                    {/*    <h3>*/}
                    {/*        {inputValues[index]?.toLocaleString('default', {month: 'long'})}*/}
                    {/*        {inputValues[index]?.getDate()}*/}
                    {/*    </h3>*/}
                    {/*    <p>*/}
                    {/*        {inputValues[index]?.toLocaleString('en-us', {weekday: 'short'})},*/}
                    {/*        {inputValues[index]?.toLocaleString('default', {month: 'long'})}*/}
                    {/*        {inputValues[index]?.getDate()}*/}
                    {/*    </p>*/}
                    {/*</div>)}*/}

                    <div className={dateNumber == 0 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(0)
                        fetchSessionBy(inputValues[0].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[0]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[0]?.getDate()}</h3>
                        <p>{inputValues[0]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[0]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[0]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 1 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(1)
                        fetchSessionBy(inputValues[1].toISOString().substring(0, 10))

                    }}>
                        <h3>{inputValues[1]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[1]?.getDate()}</h3>
                        <p>{inputValues[1]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[1]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[1]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 2 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(2)
                        fetchSessionBy(inputValues[2].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[2]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[2]?.getDate()}</h3>
                        <p>{inputValues[2]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[2]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[2]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 3 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(3)
                        fetchSessionBy(inputValues[3].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[3]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[3]?.getDate()}</h3>
                        <p>{inputValues[3]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[3]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[3]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 4 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(4)
                        fetchSessionBy(inputValues[4].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[4]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[4]?.getDate()}</h3>
                        <p>{inputValues[4]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[4]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[4]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 5 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(5)
                        fetchSessionBy(inputValues[5].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[5]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[5]?.getDate()}</h3>
                        <p>{inputValues[5]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[5]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[5]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 6 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(6)
                        fetchSessionBy(inputValues[6].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[6]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[6]?.getDate()}</h3>
                        <p>{inputValues[6]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[6]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[6]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 7 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(7)
                        fetchSessionBy(inputValues[7].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[7]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[7]?.getDate()}</h3>
                        <p>{inputValues[7]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[7]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[7]?.getDate()}</p>
                    </div>
                    <div className={dateNumber == 8 ? `${s.dayBlock} ${s.active}` : `${s.dayBlock}`}  onClick={() => {
                        switchSession(8)
                        fetchSessionBy(inputValues[8].toISOString().substring(0, 10))
                    }}>
                        <h3>{inputValues[8]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[8]?.getDate()}</h3>
                        <p>{inputValues[8]?.toLocaleString('en-us', {weekday: 'short'})},
                            {' '}
                            {inputValues[8]?.toLocaleString('default', {month: 'long'})}
                            {' '}
                            {inputValues[8]?.getDate()}</p>
                    </div>
                </div>
                <div className={s.divider}></div>
                <div className={s.movieBlock}>
                    {movies.map(x => <Movie  movie_id={x.id} poster={x.poster} date={inputValues[dateNumber].toISOString().substring(0, 10)} name={x.name} />)}
                    {/*<div className={s.item}>*/}
                    {/*    <div className={s.title}>*/}
                    {/*        <img src={mov} alt="" width={200}/>*/}
                    {/*        <p>Doctor Strange 2</p>*/}
                    {/*    </div>*/}

                    {/*    <ul className={s.timetable}>*/}
                    {/*        <li className={s.active}>11:00</li>*/}
                    {/*        <li>12:00</li>*/}
                    {/*        <li>13:00</li>*/}
                    {/*        <li>14:00</li>*/}
                    {/*        <li>15:00</li>*/}
                    {/*        <li>16:00</li>*/}
                    {/*    </ul>*/}

                    {/*</div>*/}
                    {/*<div className={s.item}>*/}
                    {/*    <div className={s.title}>*/}
                    {/*        <img src={mov} alt="" width={200}/>*/}
                    {/*        <p>Doctor Strange 2</p>*/}
                    {/*    </div>*/}

                    {/*    <ul className={s.timetable}>*/}
                    {/*        <li>11:00</li>*/}
                    {/*        <li>12:00</li>*/}
                    {/*        <li>13:00</li>*/}
                    {/*        <li>14:00</li>*/}
                    {/*        <li>15:00</li>*/}
                    {/*        <li>16:00</li>*/}
                    {/*    </ul>*/}

                    {/*</div>*/}
                    {/*<div className={s.item}>*/}
                    {/*    <div className={s.title}>*/}
                    {/*        <img src={mov} alt="" width={200}/>*/}
                    {/*        <p>Doctor Strange 2</p>*/}
                    {/*    </div>*/}

                    {/*    <ul className={s.timetable}>*/}
                    {/*        <li>11:00</li>*/}
                    {/*        <li>12:00</li>*/}
                    {/*        <li>13:00</li>*/}
                    {/*        <li>14:00</li>*/}
                    {/*        <li>15:00</li>*/}
                    {/*        <li>16:00</li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    );
};

export default Cinema;