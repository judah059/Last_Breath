import React from 'react';
import s from './NowInCinema.module.scss'
import img from '../../assets/tempMovieImage.jpg'

interface MovieItemProps {
    name: string
    poster: string
}

const MovieItem: React.FC<MovieItemProps> = ({name, poster}) => {
    return (
        <div className={s.movie_item}>
            <img src={poster} alt="movieImage"/>
            <p>{name}</p>
        </div>
    );
};

export default MovieItem;