import React from 'react';
import s from "./Movie.module.scss";
import mov from "../../../assets/tempMovieImage.jpg";
import {ISessionByDate} from "../../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {API} from "../../../utils/api";
import {setSessionById} from "../../../store/session/session.slice";
import {useAppDispatch} from "../../../utils/hooks/redux";

interface MovieProps {
    poster: string,
    name: string,
    session: ISessionByDate | undefined
    movie_id: string
}

const Movie: React.FC<MovieProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const onClickTicketOpen = async (id: number) => {
        const data = await API.getSessionById(id)
        dispatch(setSessionById(data))
        navigate('/tickets-order')
    }

    return (
        <div className={s.item}>
            <div className={s.title} onClick={() => navigate(`../main/movies/${props.movie_id}`)}>
                <img src={props.poster} alt="" width={200}/>
                <p>{props.name}</p>
            </div>
            <ul className={s.timetable}>
                {props.session?.halls.map(x => <div>
                    Hall {x.id}
                    <div>
                        {x.sessions.map((s, index) => <li key={index}
                            onClick={() => onClickTicketOpen(x.sessions[index].id)}>
                            {s.start_time.substring(s?.start_time?.length - 3, 0)}
                        </li>)}
                    </div>
                </div>)}
                {/*<li className={s.active}>11:00</li>*/}
                {/*<li>12:00</li>*/}
                {/*<li>13:00</li>*/}
                {/*<li>14:00</li>*/}
                {/*<li>15:00</li>*/}
                {/*<li>16:00</li>*/}
            </ul>
        </div>
    )
};

export default Movie;