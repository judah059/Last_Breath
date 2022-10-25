import React from 'react';
import s from './NowInCinema.module.scss'
import MovieItem from "./MovieItem";

const NowInCinema: React.FC = () => {
    return (
        <div className={s.container}>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
            <MovieItem/>
        </div>
    );
};

export default NowInCinema;