import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import {API} from "../../utils/api";
import {
   IHall,
   IMovieItem,
   ISession,
   ISessionByDate, ISessionEmptyArray,
   ISessionItem,
   ITestMovieItem,
   niceBackEnd
} from "../../utils/api/types";
import s from "./MoviePage.module.scss"
import play from "../../assets/play-button.png"
import vector from "../../assets/Vector.png"
import {useNavigate, useParams} from "react-router-dom";
import {setCinema, setIsCinemaPage} from "../../store/cinema/cinema.slice";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import {setSessionById} from "../../store/session/session.slice";


const MoviePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [movie, setMovie] = useState<ITestMovieItem | undefined>(undefined);
    const [session, setSession] = useState<ISession[] | undefined>()
    const {id} = useParams()
    const {cinema} = useAppSelector((state: RootState) => state.cinema);
    const nowDate = new Date()
    const [inputValue, setInputValue] = useState<Date>(nowDate);
    const [inputValues, setInputValues] = useState<Date[]>([]);
    const [sessionByDateAndCinema, setSessionByDateAndCinema] = useState<ISessionByDate>()
    const [inputValuesForSpecDate, setInputValuesForSpecDate] = useState<ISessionItem | {}>();
    const [popup, setPopup] = useState<Boolean>(true)
    const [noHalls, setNoHallse] = useState<Boolean>(false)
    const [labels, setLabels] = useState<String[]>(["KinoLand", "Planet cinema", "Dafa Multiplex", "Cinema Kyiv"])
    const [datesForItems, setDatesForItems] = useState<String[]>(["11:00", "12:00", "13:00", "14:00"])
    const fetchData = async () => {
        try {
            const movie: ITestMovieItem = await API.getCinemaMovie(id);
            setMovie(movie)

         // dates
         let dates = []
         let multiplier = 0
         for (let i = 0; i < 4; i++, multiplier++) {
            dates.push(new Date(Date.now() + (( 3600 * 1000 * 24) * multiplier)))
         }
         await setInputValues(dates);

         // session by date from today's date
         let sessionsByDate : ISessionByDate[] = []

         if(inputValue === nowDate) sessionsByDate = await API.getSessionByDate({date: dates[0].toISOString().substring(0, 10),  cinema: cinema?.id});
         else await API.getSessionByDate({date: inputValue.toISOString().substring(0, 10),  cinema: cinema?.id});

         let sessionByDate: ISessionByDate = sessionsByDate[0];
         // console.log(sessionByDate)
         let hallsLength = sessionByDate.halls.length
         let counter = 0 ;

         for (let i = 0; i < sessionByDate.halls.length; i++) {
            if(sessionByDate.halls[i].sessions.every(element => element === null)) {
               sessionByDate.halls[i].sessions.splice(i, 1)
               if(sessionByDate.halls.every(element => element.sessions.length  as number === 0)){
                  setNoHallse(true)
                  break;
               }
               else   continue;
            }
            for (let j = 0; j <sessionByDate.halls[i].sessions.length; j++) {
               if(movie && sessionByDate.halls[i].sessions[j]?.movie != +movie?.id) {
                  sessionByDate.halls[i].sessions.splice(j, 1)
                  j--;
               }
            }
         }
         if(hallsLength !== counter) setNoHallse(false);

         for (let i = 0; i < sessionByDate.halls.length; i++) {
            for (let j = 0; j < sessionByDate.halls[i].sessions.length; j++) {
               if ((sessionByDate.halls[i].sessions[j] && sessionByDate.halls[i].sessions[j+1]) && (Number(sessionByDate.halls[i].sessions[j].start_time.substring(0,2)) > Number(sessionByDate.halls[i].sessions[j+1].start_time.substring(0,2)))) {
                  let temp = sessionByDate.halls[i].sessions[j];
                  sessionByDate.halls[i].sessions[j] = sessionByDate.halls[i].sessions[j+1];
                  sessionByDate.halls[i].sessions[j+1] = temp;
               }
            }
         }

         await  setSessionByDateAndCinema(sessionByDate)
         console.log(sessionByDate)
      } catch (e) {
         console.log(e)
      }
   }

   const fetchSessionBy = async (date: string) => {
      const sessionsByDate : ISessionByDate[] = await API.getSessionByDate({date: date,  cinema: cinema?.id});
      let sessionByDate: ISessionByDate = sessionsByDate[0];
      let hallsLength = sessionByDate.halls.length
      let counter = 0
      for (let i = 0; i < sessionByDate.halls.length; i++) {
         if(sessionByDate.halls[i].sessions.every(element => element === null)) {
            counter++
            if(hallsLength === counter){
               setNoHallse(true)
               console.log("No halls true")
               break;
            }
            else continue;

         }

         for (let j = 0; j <sessionByDate.halls[i].sessions.length; j++) {
            if(movie && sessionByDate.halls[i].sessions[j]?.movie != +movie?.id) {
               sessionByDate.halls[i].sessions.splice(j, 1)
               j--;
            }
         }
      }
      if(hallsLength !== counter) setNoHallse(false);
      // console.log(sessionByDate.halls.forEach(x=> x.sessions.sort((a,b) => (Number(a.start_time.substring(2)) > Number(b.start_time.substring(2))) ? 1 : 1)))


      for (let i = 0; i < sessionByDate.halls.length; i++) {
         for (let j = 0; j < sessionByDate.halls[i].sessions.length; j++) {
            if ((sessionByDate.halls[i].sessions[j] && sessionByDate.halls[i].sessions[j+1]) && (Number(sessionByDate.halls[i].sessions[j].start_time.substring(0,2)) > Number(sessionByDate.halls[i].sessions[j+1].start_time.substring(0,2)))) {
               let temp = sessionByDate.halls[i].sessions[j];
               sessionByDate.halls[i].sessions[j] = sessionByDate.halls[i].sessions[j+1];
               sessionByDate.halls[i].sessions[j+1] = temp;
            }
         }
      }

      await  setSessionByDateAndCinema(sessionByDate)
      console.log(sessionByDate)
   }

   const fetchSession = async () => {
      try {
         const sessions : ISession[] = await API.getSession();
         let sessionsMovie : ISession[]  = sessions.filter(x => x.movie.toString() === id?.toString())
         setSession(sessionsMovie)

         // setMovie(movie)
         console.log(session)
         // console.log(bla)
      } catch (e) {
         console.log(e)
         setMovie(undefined)
         // alert(e)
      }
   }
   const popupToggle = () => {
      if(popup) setPopup(false)
      else setPopup(true)
   }
   useEffect( () => {
      fetchData()
      fetchSession()

      dispatch(setIsCinemaPage(false))

      return () => {
         dispatch(setIsCinemaPage(true))
         dispatch(setCinema(null))
      }
   }, [])


    const navigate = useNavigate()
    const onClickTicketOpen = async (id: number) => {
        const data = await API.getSessionById(id)
        dispatch(setSessionById(data))
        navigate('/tickets-order')
    }

    return (
        <div>
            <HeaderDrawer toLinkText='Now In Cinema'/>
            {
                movie == undefined ? <h1 style={{margin: "auto"}}>No movies were found</h1>
                    :
                    <div>
                        <div className={s.page__flex__Container}>
                            <div className={s.movie__poster}>
                                <div className={s.movie__poster__Container}>
                                    <div className={s.image__Container}>
                                        <img src={movie?.poster}/>
                                    </div>
                                </div>
                                <div className={s.movie__poster__trailer__container}>
                                    <div>
                                        <img src={play} alt=""/>
                                        <div className={s.poster__trailer__text}>Watch trailer</div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.main__info}>
                                <div className={s.main__info__title}>{movie?.name}</div>
                                <div className={s.main__info__flex}>
                                    <div>
                                        <div className={s.main__info__text}>Age rating:</div>
                                        <div className={s.main__info__text}>Release year:</div>
                                        <div className={s.main__info__text}>Producer:</div>
                                        <div className={s.main__info__text}>Genre:</div>
                                        <div className={s.main__info__text}>Duration:</div>
                                        <div className={s.main__info__text}>Studio:</div>
                                        <div className={s.main__info__text}>Starring:</div>
                                    </div>
                                    <div>
                                        <div className={s.main__info__text}>{movie?.ageLimit}</div>
                                        <div className={s.main__info__text}>{movie?.release_date}</div>
                                        <div className={s.main__info__text}>{movie?.producer}</div>
                                        <div className={s.main__info__text}>Нет такого</div>
                                        <div className={s.main__info__text}>{movie?.length}</div>
                                        <div className={s.main__info__text}>Нет такого</div>
                                        <div className={s.main__info__text}>{movie?.cast}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.session}>
                                <div className={s.session__header}>
                                    <div className={s.session__header__title}>Sessions</div>
                                    <div className={s.session__header__dropdown} onClick={popupToggle}>
                                        <div className={s.session__header__dropdown__label}>
                                            <div>
                                                {inputValue?.toLocaleString('en-us', {weekday: 'short'})}, {inputValue?.toLocaleString('default', {month: 'long'})} {inputValue?.getDate()}
                                            </div>
                                            <img src={vector} className={s.vector} alt=""/>
                                        </div>
                                        {popup ?
                                            <div className={s.session__header__dropdown__menu}>
                                                <div
                                                    className={s.session__header__dropdown__menu__items}>{inputValues[0]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[0]?.toLocaleString('default', {month: 'long'})} {inputValues[0]?.getDate()}</div>
                                                <div
                                                    className={s.session__header__dropdown__menu__items}>{inputValues[1]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[1]?.toLocaleString('default', {month: 'long'})} {inputValues[1]?.getDate()}</div>
                                                <div
                                                    className={s.session__header__dropdown__menu__items}>{inputValues[2]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[2]?.toLocaleString('default', {month: 'long'})} {inputValues[2]?.getDate()}</div>
                                                <div
                                                    className={s.session__header__dropdown__menu__items}>{inputValues[3]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[3]?.toLocaleString('default', {month: 'long'})} {inputValues[3]?.getDate()}</div>
                                            </div>
                                            :
                                            <div className={`${s.session__header__dropdown__menu} ${s.active}`}>
                                                <div className={s.session__header__dropdown__menu__items}
                                                     onClick={() => {
                                                         setInputValue(inputValues[0])
                                                         fetchSessionBy(inputValues[0].toISOString().substring(0, 10))
                                                         popupToggle()
                                                     }}>{inputValues[0]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[0]?.toLocaleString('default', {month: 'long'})} {inputValues[0]?.getDate()}</div>
                                                <div className={s.session__header__dropdown__menu__items}
                                                     onClick={() => {
                                                         setInputValue(inputValues[1])
                                                         fetchSessionBy(inputValues[1].toISOString().substring(0, 10))
                                                         popupToggle()
                                                     }}>{inputValues[1]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[1]?.toLocaleString('default', {month: 'long'})} {inputValues[1]?.getDate()}</div>
                                                <div className={s.session__header__dropdown__menu__items}
                                                     onClick={() => {
                                                         setInputValue(inputValues[2])
                                                         fetchSessionBy(inputValues[2].toISOString().substring(0, 10))
                                                         popupToggle()
                                                     }}>{inputValues[2]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[2]?.toLocaleString('default', {month: 'long'})} {inputValues[2]?.getDate()}</div>
                                                <div className={s.session__header__dropdown__menu__items}
                                                     onClick={() => {
                                                         setInputValue(inputValues[3])
                                                         fetchSessionBy(inputValues[3].toISOString().substring(0, 10))
                                                         popupToggle()
                                                     }}>{inputValues[3]?.toLocaleString('en-us', {weekday: 'short'})}, {inputValues[3]?.toLocaleString('default', {month: 'long'})} {inputValues[3]?.getDate()}</div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className={s.session__bottom}>
                                    {(() => {

                                        if (noHalls) {
                                            return (
                                                <div className={s.session__bottom__items} style={{textAlign: "center"}}>
                                                    No sessions
                                                </div>
                                            )
                                        } else {
                                            return (
                                                sessionByDateAndCinema?.halls.map(x =>
                                                    <div className={s.session__bottom__items}>
                                                        <div>Hall №{x.id}</div>
                                                        <div className={s.session__bottom__items__flex}>
                                                            {x.sessions.map((d, index) => <div key={index}
                                                                                               onClick={() => onClickTicketOpen(x.sessions[index].id)}
                                                                                               style={{cursor: "pointer"}}>{d?.start_time?.substring(d?.start_time?.length - 3, 0)}</div>)}
                                                        </div>
                                                    </div>
                                                )

                                            )
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>

                        <div className={s.main__info__description}>Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat
                            illum labore qui quia quibusdam, quis soluta totam veniam voluptas! Alias,
                            reprehenderit!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                            consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat illum labore qui
                            quia quibusdam, quis soluta totam veniam voluptas! Alias, reprehenderit!
                        </div>
                    </div>
            }
        </div>
    );
};

export default MoviePage;