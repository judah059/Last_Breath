import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import {API} from "../../utils/api";
import {
   IHall,
   IMovieItem,
   ISession,
   ISessionByDate,
   ISessionItem,
   ITestMovieItem,
   niceBackEnd
} from "../../utils/api/types";
import s from "./MoviePage.module.scss"
import play from "../../assets/play-button.png"
import vector from "../../assets/Vector.png"
import {useParams} from "react-router-dom";
import {setCinema, setIsCinemaPage} from "../../store/cinema/cinema.slice";
import {useAppDispatch} from "../../utils/hooks/redux";


const MoviePage: React.FC = () => {
   const dispatch = useAppDispatch();
   const [movie, setMovie] = useState<ITestMovieItem>();
   const [session, setSession] = useState<ISession[] | undefined>()
   const {id} = useParams()
   const [inputValue, setInputValue] = useState<Date>(new Date());
   const [inputValues, setInputValues] = useState<Date[]>([]);
   const [sessionByDateAndCinema, setSessionByDateAndCinema] = useState<ISessionByDate>()
   const [inputValuesForSpecDate, setInputValuesForSpecDate]= useState<ISessionItem | {}>();
   const [popup, setPopup] = useState<Boolean>(true)
   const [labels, setLabels] = useState<String[]>(["KinoLand", "Planet cinema", "Dafa Multiplex", "Cinema Kyiv"])
   const [datesForItems, setDatesForItems] = useState<String[]>(["11:00", "12:00", "13:00", "14:00"])
   const fetchMovie = async () => {
      try {
         const movie : ITestMovieItem = await API.getCinemaMovie(id);
         const sessionsByDate : ISessionByDate[] = await API.getSessionByDate({date: "2022-11-13",  cinema: 1});
         let sessionByDate: ISessionByDate = sessionsByDate[0];
         // console.log(sessionByDate)
         for (let i = 0; i < sessionByDate.halls.length; i++) {
            for (let j = 0; j <sessionByDate.halls[i].sessions.length; j++) {
               if(movie && sessionByDate.halls[i].sessions[j]?.movie != +movie?.id) {
                  sessionByDate.halls[i].sessions.splice(j, 1)
                  j--;
               }
            }
         }



         await setMovie(movie)
         await  setSessionByDateAndCinema(sessionByDate)
         console.log(sessionByDate)

         // console.log(movie)
      } catch (e) {
         console.log(e)
         // setMovie(undefined)
         // alert(e)
      }
   }

   const groupBy = (items : niceBackEnd[], key : string) =>
       items.reduce(
           (result, item) => ({
              ...result,
              // @ts-ignore
              [item[key]]: [...(result[item[key]] || []), item.time]
           }),
           {}
       );
   const changeInputValuesForSpecDate =  (date : Date) => {
      let da = [];
      if(session) {
         for (let i = 0; i < session.length; i++) {
               if(session[i].date === date.toISOString().substring(0, 10)) da.push(session[i]);
         }
         // setInputValuesForSpecDate(da);
         let res = da.map((s) => ({
            cinema: s.cinemahall_detail.cinema_name,
            time: s.start_time
         }));
         const iLoveBackEnd : ISessionItem | {} = groupBy(res, "cinema")
         setInputValuesForSpecDate(iLoveBackEnd);

      }



   }
   const fetchSession = async () => {
      try {
         const sessions : ISession[] = await API.getSession();
         let sessionsMovie : ISession[]  = sessions.filter(x => x.movie.toString() === id?.toString())
         // const sessionCinema1 = sessionsMovie.filter(x => x.cinema === 1)
         //  sessions.map((cinema, index) => <div>{cinema.cinemahall_detail.cinema_name} <div>{cinema}</div></div>)
         // const bla = sessionsMovie.map(s=>({cinema: s.cinemahall_detail.cinema_name, time:s.start_time}))
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

      console.log(popup)
   }
   // const date = new Date();
   const addInputValues = async () => {
      let dates = []
      let multiplier = 0
      for (let i = 0; i < 4; i++, multiplier++) {
         dates.push(new Date(Date.now() + (( 3600 * 1000 * 24) * multiplier)))
      }
      await setInputValues(dates);
   }
   useEffect( () => {
      fetchMovie()
      fetchSession()
      addInputValues()
      fetchSessionByDate()
      // console.log(datesForItems)

      dispatch(setIsCinemaPage(false))

      return () => {
         dispatch(setIsCinemaPage(true))
         dispatch(setCinema(null))
      }
   }, [])

   const fetchSessionByDate = async () => {
      try {
         // const sessionsByDate : ISessionByDate[] = await API.getSessionByDate({date: "2022-11-13",  cinema: 1});
         // let sessionByDate: ISessionByDate = sessionsByDate[0];
         // // let newArray: IHall[] = [];
         // console.log(sessionByDate)
         // for (let i = 0; i < sessionByDate.halls.length; i++) {
         //    for (let j = 0; j <sessionByDate.halls[i].sessions.length; j++) {
         //       if(movie && sessionByDate.halls[i].sessions[j]?.movie != +movie?.id) {
         //          sessionByDate.halls[i].sessions.splice(j, 1)
         //          j--;
         //       }
         //    }
         // }
         // console.log(sessionByDate)



         // console.log(sessionsByDate.filter(x => x.sessions[]))

         // for (let i = 0; i < sessionsByDate.length; i++) {
         //    for (let j = 0; j < sessionsByDate[i].sessions.length; j++) {
         //       if(sessionsByDate[i].sessions[j].date === "2022-11-13") {
         //          // arrayOfSessions.push(sessionsByDate[i].sessions[j])
         //
         //          // sessionDictionary.push({label: sessionsByDate[i].cinema_name, sessions: ...sessionDictionary})
         //          newArray.push(sessionsByDate[i])
         //          // sessionsByDate[i].sessions.
         //       }
         //          if(j  == sessionsByDate[i].sessions.length - 1) {
         //             // sessionDictionary.push({label: sessionsByDate[i].cinema_name, sessions: arrayOfSessions})
         //             // arrayOfSessions = [];
         //          }
         //       }
         //    }


         // console.log(sessionsByDate.map(x => x.sessions.filter(x => x.date === "2022-11-13")))
         // console.log(sessionsByDate)
      } catch (e) {
         console.log(e)
         // setMovie(undefined)
      }

   }

   return (
       <div>
          <HeaderDrawer toLinkText='Now In Cinema'/>

          {
             movie == undefined ? <h1 style={{ margin: "auto"}}>No movies were found</h1>
                 :
                 <div>
                    <div className={s.page__flex__Container}>
                       <div className={s.movie__poster}>
                          <div className={s.movie__poster__Container}>
                             <div className={s.image__Container}>
                                <img  src={movie?.poster}/>
                             </div>
                          </div>
                          <div className={s.movie__poster__trailer__container}>
                             <div >
                                <img src={play} alt=""/>
                                <div className={s.poster__trailer__text}>Watch trailer</div>
                             </div>
                          </div>
                       </div>


                       <div className={s.main__info}>
                          <div className={s.main__info__title}>{movie?.name}</div>
                          <div className={s.main__info__flex}>
                             <div >
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
                                <div className={s.session__header__dropdown__label} >
                                   <div>
                                      {inputValue?.toLocaleString('en-us', {weekday:'short'})},  {inputValue?.toLocaleString('default', { month: 'long' })} {inputValue?.getDate()}
                                   </div>
                                   <img src={vector} className={s.vector} alt=""/>
                                </div>
                                {popup ?
                                    <div className={s.session__header__dropdown__menu}>
                                       <div className={s.session__header__dropdown__menu__items}>{inputValues[0]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[0]?.toLocaleString('default', { month: 'long' })} {inputValues[0]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}>{inputValues[1]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[1]?.toLocaleString('default', { month: 'long' })} {inputValues[1]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}>{inputValues[2]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[2]?.toLocaleString('default', { month: 'long' })} {inputValues[2]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}>{inputValues[3]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[3]?.toLocaleString('default', { month: 'long' })} {inputValues[3]?.getDate()}</div>
                                    </div>
                                    :
                                    <div className={`${s.session__header__dropdown__menu} ${s.active}`}>
                                       <div className={s.session__header__dropdown__menu__items} onClick={() => {
                                          setInputValue(inputValues[0])
                                          changeInputValuesForSpecDate(inputValues[0])
                                          popupToggle()
                                       }}>{inputValues[0]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[0]?.toLocaleString('default', { month: 'long' })} {inputValues[0]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[1])
                                          changeInputValuesForSpecDate(inputValues[1])

                                          popupToggle()
                                       }}>{inputValues[1]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[1]?.toLocaleString('default', { month: 'long' })} {inputValues[1]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[2])
                                          changeInputValuesForSpecDate(inputValues[2])
                                          popupToggle()
                                       }}>{inputValues[2]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[2]?.toLocaleString('default', { month: 'long' })} {inputValues[2]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[3])
                                          changeInputValuesForSpecDate(inputValues[3])
                                          popupToggle()
                                       }}>{inputValues[3]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[3]?.toLocaleString('default', { month: 'long' })} {inputValues[3]?.getDate()}</div>
                                    </div>
                                }
                             </div>
                          </div>
                          <div className={s.session__bottom}>
                             {/*{inputValuesForSpecDate.la}*/}

                             <div className={s.session__bottom__items}>
                                <div>{labels[0]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index) => <div key={index} style={{cursor: "pointer"}}>{d}</div>)}
                                </div>
                             </div>

                             <div className={s.session__bottom__items}>
                                <div>{labels[1]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index) => <div key={index} style={{cursor: "pointer"}} >{d}</div>)}
                                </div>
                             </div>


                             <div className={s.session__bottom__items}>
                                <div>{labels[2]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index) => <div key={index} style={{cursor: "pointer"}} >{d}  </div>)}
                                </div>
                             </div>

                             <div className={s.session__bottom__items}>
                                <div>{labels[3]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index) => <div key={index} style={{cursor: "pointer"}} >{d}</div>)}
                                </div>
                             </div>


                          </div>
                       </div>
                    </div>

                    <div className={s.main__info__description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat illum labore qui quia quibusdam, quis soluta totam veniam voluptas! Alias, reprehenderit!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat illum labore qui quia quibusdam, quis soluta totam veniam voluptas! Alias, reprehenderit!</div>

                 </div>


          }
       </div>
   );
};

export default MoviePage;
