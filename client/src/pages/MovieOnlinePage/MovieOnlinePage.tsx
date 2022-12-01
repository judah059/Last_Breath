import React, {useEffect, useState} from 'react';
import s from "./MovieOnlinePage.module.scss";
import play from "../../assets/play-button.png";
import {IComment, IOnlineMovie, ISeries} from "../../utils/api/types";
import {useNavigate, useParams} from "react-router-dom";
import {API} from "../../utils/api";
import OnlineCHeaderCommon from "../../components/OnlineHeaderCommon/OnlineHeaderCommon";
import {useHorizontalScroll} from "../../utils/hooks/useHorizontalScroll";
import ReactPlayer from "react-player";
import Comments from "./Comments/Comments";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import {useAuth} from "../../utils/hooks/useAuth";
import {setIsLoading, setItemType} from "../../store/onlineItem/onlineItem.slice";


interface MovieOnlinePageProps {

}


const MovieOnlinePage: React.FC<MovieOnlinePageProps> = () => {

    const isLoading = useAppSelector((state: RootState) => state.user.isLoading)


    const isAuth = useAuth()
    let navigate = useNavigate();
    useEffect(() => {
        if (!isLoading && !isAuth) {
            alert('Please login to your account')
            return navigate("/online");
        }
    }, [!isAuth]);

    const {id} = useParams()
    const [isFetching, setIsFetching] = useState(true)
    const [movie, setMovie] = useState<IOnlineMovie | null>(null)
    const [selectedSeason, setSelectedSeason] = useState(1)
    const [selectedEpisode, setSelectedEpisode] = useState<ISeries | undefined>(undefined)
    const [comments, setComments] = useState<IComment[]>([])
    const [reviews, setReviews] = useState<IComment[]>([])


    const scrollRef = useHorizontalScroll();

    const itemType = useAppSelector((state: RootState) => state.onlineItem.itemType)


    const dispatch = useAppDispatch()

    useEffect(() => {

        fetchMovie()
        setIsFetching(false)

        return () => {
            if (itemType) {
                localStorage.setItem('onlineType', itemType)
            }
        }

    }, [])

    const fetchMovie = async () => {
        try {

            const onlineType = localStorage.getItem('onlineType')
            dispatch(setItemType(onlineType))

            const resMovie = await API.getSerial(`${id}`, itemType)
            setMovie(resMovie)
            if (itemType === 'serial') {
                setSelectedEpisode(resMovie?.seasons[0]?.series[0])

            }

            setComments(resMovie.comments)
            setReviews(resMovie.comments.filter(c=> c.comment_type === 'R'))


        } catch (e) {
            console.log(e)
        }
    }


    const onClickSeason = (season: number) => {
        setSelectedSeason(season)
        setSelectedEpisode(movie?.seasons[season - 1]?.series[0])
    }

    const onClickEpisode = (episode: ISeries) => {
        setSelectedEpisode(episode)
    }


    return (
        <div>
            <OnlineCHeaderCommon toLinkText={'Online'}/>
            {
                isFetching ? <div>Loading...</div> : <>
                    <div className={s.page__flex__Container}>
                        <div className={s.movie__poster}>
                            <div className={s.movie__poster__Container}>
                                <div className={s.image__Container}>
                                    <img src={movie?.poster} alt="poster"/>
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
                                    <div className={s.main__info__text}>Release date:</div>
                                    <div className={s.main__info__text}>Producer:</div>
                                    <div className={s.main__info__text}>Genre:</div>
                                    <div className={s.main__info__text}>Duration:</div>
                                    <div className={s.main__info__text}>Cast:</div>
                                </div>

                                <div>
                                    <div className={s.main__info__text}>{movie?.ageLimit}</div>
                                    <div className={s.main__info__text}>{movie?.release_date}</div>
                                    <div className={s.main__info__text}>{movie?.producer}</div>
                                    <div className={s.main__info__text}>{movie?.main_genre}</div>
                                    <div className={s.main__info__text}>{movie?.length} min</div>
                                    <div className={s.main__info__text}>{movie?.cast}</div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={s.main__content}>
                        <p className={s.main__content__description}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat
                            illum labore qui quia quibusdam, quis soluta totam veniam voluptas! Alias,
                            reprehenderit!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                            consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat illum labore qui
                            quia quibusdam, quis soluta totam veniam voluptas! Alias, reprehenderit!
                        </p>


                        <div className={s.main__content__video}>
                            {itemType === 'film' ? <></> :
                                <div className={s.main__content__series}>
                                    <ul>
                                        {
                                            movie?.seasons?.map(el => <li key={el.number}
                                                                          className={el.number === selectedSeason ? s.active : ''}
                                                                          onClick={() => onClickSeason(el.number)}
                                            > {el.number}&nbsp;season</li>)
                                        }
                                    </ul>
                                </div>}

                            <ReactPlayer url={`${itemType === 'film' ? movie?.video : selectedEpisode?.video}`}
                                         controls/>

                            {itemType === 'film' ? <></> :
                                <div className={s.main__content__series}>
                                    <ul ref={scrollRef}>

                                        {
                                            movie?.seasons[selectedSeason - 1]?.series?.map(el => <li
                                                key={el.id}
                                                className={el.number === selectedEpisode?.number ? s.active : ''}
                                                onClick={() => onClickEpisode(el)}
                                            > {el?.number}&nbsp;episode</li>)
                                        }
                                    </ul>
                                </div>}
                        </div>
                        <Comments movieId={movie?.id}
                                  comments={comments}
                                  setComments={setComments}
                                  reviews={reviews}
                                  setReviews={setReviews}
                        />
                    </div>


                </>
            }


        </div>
    );
};

export default MovieOnlinePage;