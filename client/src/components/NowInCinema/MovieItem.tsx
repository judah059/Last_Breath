import React from 'react';
import s from './NowInCinema.module.scss'
import img from '../../assets/tempMovieImage.jpg'

interface MovieItemProps {
    name: string
    imageUrl: string
}

const MovieItem: React.FC<MovieItemProps> = ({name, imageUrl}) => {
    return (
        <div className={s.movie_item}>
            <img src={imageUrl} alt="movieImage"/>
            <p>{name}</p>
        </div>
    );
};

export default MovieItem;