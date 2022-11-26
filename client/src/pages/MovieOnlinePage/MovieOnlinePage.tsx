import React, {useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from "../MoviePage/MoviePage.module.scss";
import play from "../../assets/play-button.png";
import {ITestMovieItem} from "../../utils/api/types";

interface MovieOnlinePageProps {

}


const MovieOnlinePage: React.FC<MovieOnlinePageProps> = () => {

    const [movie, setMovie] = useState<ITestMovieItem | null>(null)

    return (
        <div>
            <HeaderDrawer toLinkText='Now In Cinema'/>
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
                        </div>

                        <div className={s.main__info__description}>Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat
                            illum labore qui quia quibusdam, quis soluta totam veniam voluptas! Alias,
                            reprehenderit!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
                            consequuntur debitis deleniti dolore ducimus eaque enim explicabo fugiat illum labore qui
                            quia quibusdam, quis soluta totam veniam voluptas! Alias, reprehenderit!
                        </div>

                    </div>



        </div>
    );
};

export default MovieOnlinePage;