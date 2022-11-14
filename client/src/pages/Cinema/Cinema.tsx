import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cinema.module.scss'
import mov from "../../assets/tempMovieImage.jpg";
import cinemaTemp from "../../assets/cinemaTemp.jpg";
import location from "../../assets/location.svg";
import {useParams} from "react-router-dom";
import {ICinema} from "../../utils/api/types";
import {API} from "../../utils/api";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {setCinema} from "../../store/cinema/cinema.slice";
import {RootState} from "../../store";


interface CinemaProps {

}


const Cinema: React.FC<CinemaProps> = () => {

    const {id} = useParams() as { id: string };

    const [currCinema, setCurrCinema] = useState<ICinema>()
    const dispatch = useAppDispatch();
    const {cinema, isCinemaPage} = useAppSelector((state: RootState) => state.cinema);


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

    useEffect(() => {
        fetchCinema()

        return () => {
            dispatch(setCinema(null))
        }
    }, [id])


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
                    <div className={`${s.dayBlock} ${s.active}`}>
                        <h3>June 13</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 13</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 14</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 15</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 16</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 17</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 18</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 19</h3>
                        <p>Sat, June 11</p>
                    </div>
                    <div className={s.dayBlock}>
                        <h3>June 20</h3>
                        <p>Sat, June 11</p>
                    </div>


                </div>
                <div className={s.divider}></div>
                <div className={s.movieBlock}>
                    <div className={s.item}>
                        <div className={s.title}>
                            <img src={mov} alt="" width={200}/>
                            <p>Doctor Strange 2</p>
                        </div>

                        <ul className={s.timetable}>
                            <li className={s.active}>11:00</li>
                            <li>12:00</li>
                            <li>13:00</li>
                            <li>14:00</li>
                            <li>15:00</li>
                            <li>16:00</li>
                        </ul>

                    </div>
                    <div className={s.item}>
                        <div className={s.title}>
                            <img src={mov} alt="" width={200}/>
                            <p>Doctor Strange 2</p>
                        </div>

                        <ul className={s.timetable}>
                            <li>11:00</li>
                            <li>12:00</li>
                            <li>13:00</li>
                            <li>14:00</li>
                            <li>15:00</li>
                            <li>16:00</li>
                        </ul>

                    </div>
                    <div className={s.item}>
                        <div className={s.title}>
                            <img src={mov} alt="" width={200}/>
                            <p>Doctor Strange 2</p>
                        </div>

                        <ul className={s.timetable}>
                            <li>11:00</li>
                            <li>12:00</li>
                            <li>13:00</li>
                            <li>14:00</li>
                            <li>15:00</li>
                            <li>16:00</li>
                        </ul>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Cinema;