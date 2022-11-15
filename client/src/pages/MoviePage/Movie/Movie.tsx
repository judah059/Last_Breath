import React from 'react';
import s from "./Movie.module.scss";
import mov from "../../../assets/tempMovieImage.jpg";
import {ISessionByDate} from "../../../utils/api/types";

interface MovieProps {
    poster: string,
    name: string,
    session: ISessionByDate | undefined
}

const Movie: React.FC<MovieProps> = (props) => {
    return (
        <div className={s.item}>
            <div className={s.title}>
                <img src={props.poster} alt="" width={200}/>
                <p>{props.name}</p>
            </div>
            <ul className={s.timetable}>
                {props.session?.halls.map(x => <div>
                    Hall {x.id}
                    <div>
                        {x.sessions.map(s => <li>
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