import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import {API} from "../../utils/api";
import {IMovieItem, ITestMovieItem} from "../../utils/api/types";
import s from "./MoviePage.module.scss"
import play from "../../assets/play-button.png"
import vector from "../../assets/Vector.png"
import {useParams} from "react-router-dom";



const MoviePage: React.FC = () => {
   const [movie, setMovie] = useState<ITestMovieItem>();
   const {id} = useParams()
   const [inputValue, setInputValue] = useState<Date>(new Date());
   const [inputValues, setInputValues] = useState<Date[]>([]);
   const [popup, setPopup] = useState<Boolean>(true)
   const [labels, setLabels] = useState<String[]>(["KinoLand", "Planet cinema", "Dafa Multiplex", "Cinema Kyiv"])
   const [datesForItems, setDatesForItems] = useState<String[]>(["11:00", "12:00", "13:00", "14:00"])
   const fetchMovie = async () => {
      try {
         const movie : ITestMovieItem = await API.getCinemaMovie(id);
         setMovie(movie)
         // console.log(movie)
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
      addInputValues()
      console.log(datesForItems)
   }, [])


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
                                          popupToggle()
                                       }}>{inputValues[0]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[0]?.toLocaleString('default', { month: 'long' })} {inputValues[0]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[1])
                                          popupToggle()
                                       }}>{inputValues[1]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[1]?.toLocaleString('default', { month: 'long' })} {inputValues[1]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[2])
                                          popupToggle()
                                       }}>{inputValues[2]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[2]?.toLocaleString('default', { month: 'long' })} {inputValues[2]?.getDate()}</div>
                                       <div className={s.session__header__dropdown__menu__items}  onClick={() => {
                                          setInputValue(inputValues[3])
                                          popupToggle()
                                       }}>{inputValues[3]?.toLocaleString('en-us', {weekday:'short'})},  {inputValues[3]?.toLocaleString('default', { month: 'long' })} {inputValues[3]?.getDate()}</div>
                                    </div>
                                }
                             </div>
                          </div>
                          <div className={s.session__bottom}>
                             <div className={s.session__bottom__items}>
                                <div>{labels[0]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index,x) => <div key={index}>{x[index]}</div>)}
                                </div>
                             </div>
                             <div className={s.session__bottom__items}>
                                <div>{labels[1]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index,x) => <div key={index}>{x[index]}</div>)}
                                </div>
                             </div>
                             <div className={s.session__bottom__items}>
                                <div>{labels[2]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index, x) => <div key={index}>{x[index]}</div>)}
                                </div>
                             </div>
                             <div className={s.session__bottom__items}>
                                <div>{labels[3]}</div>
                                <div className={s.session__bottom__items__flex}>
                                   {datesForItems.map((d, index, x) => <div key={index}>{x[index]}</div>)}
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
