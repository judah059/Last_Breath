import React from 'react';
import s from './NowInCinema.module.scss'
import img from '../../assets/tempMovieImage.jpg'

const MovieItem: React.FC = () => {
    return (
        <div className={s.movie_item}>
                <img src={img} alt="movieImage"/>
                <p>Doctor Strange 2</p>
        </div>
    );
};

export default MovieItem;