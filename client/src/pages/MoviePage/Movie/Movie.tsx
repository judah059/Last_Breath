import React, {useEffect, useState} from 'react';
import s from "./Movie.module.scss";
import mov from "../../../assets/tempMovieImage.jpg";
import {IMovieItem, ISessionByDate, ITestMovieItem} from "../../../utils/api/types";
import {useNavigate, useParams} from "react-router-dom";
import {API} from "../../../utils/api";
import {setSessionById} from "../../../store/session/session.slice";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";
import {setCinema} from "../../../store/cinema/cinema.slice";

interface MovieProps {
    poster: string,
    name: string,
    movie_id: string,
    date: string
}

const Movie: React.FC<MovieProps> = (props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
   const [movie, setMovie] = useState<ITestMovieItem | undefined>(undefined);
   const [noHalls, setNoHallse] = useState<Boolean>(false)
   const [sessionByDateAndCinema, setSessionByDateAndCinema] = useState<ISessionByDate>()
   const {cinema, isCinemaPage} = useAppSelector((state: RootState) => state.cinema);

   // const {id} = useParams() as { id: string };

    const onClickTicketOpen = async (id: number) => {
        const data = await API.getSessionById(id)
        dispatch(setSessionById(data))
        navigate('/tickets-order')
    }
   useEffect(() => {
      fetchSessionBy()
   }, [props.date])

   const fetchSessionBy = async () => {
      const movie: ITestMovieItem = await API.getCinemaMovie(props.movie_id);
      setMovie(movie)
      const sessionsByDate: ISessionByDate[] = await API.getSessionByDate({date: props.date, cinema: cinema?.id});
      let sessionByDate: ISessionByDate = sessionsByDate[0];
      console.log(sessionByDate)
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
            if ((sessionByDate.halls[i].sessions[j] && sessionByDate.halls[i].sessions[j + 1]) && (Number(sessionByDate.halls[i].sessions[j].start_time.substring(0, 2)) > Number(sessionByDate.halls[i].sessions[j + 1].start_time.substring(0, 2)))) {
               let temp = sessionByDate.halls[i].sessions[j];
               sessionByDate.halls[i].sessions[j] = sessionByDate.halls[i].sessions[j + 1];
               sessionByDate.halls[i].sessions[j + 1] = temp;
            }
         }
      }

      await setSessionByDateAndCinema(sessionByDate)
      console.log(sessionByDate)
   }

    return (
        <div className={s.item}>
            <div className={s.title} onClick={() => navigate(`../main/movies/${props.movie_id}`)}>
                <img src={props.poster} alt="" width={200}/>
                <p>{props.name}</p>
            </div>
            <ul className={s.timetable}>
                {sessionByDateAndCinema?.halls.map((x, index) => <div key={index}>
                    <p style={{margin: "0 0 8px 4px", textAlign: "start"}}>Hall #{x?.id}</p>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {x.sessions.map((s, index) => <li key={index} style={{margin: "4px 4px"}}
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