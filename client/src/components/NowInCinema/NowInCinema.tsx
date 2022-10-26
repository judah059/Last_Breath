import React, {useEffect, useState} from 'react';
import s from './NowInCinema.module.scss'
import MovieItem from "./MovieItem";
import {API} from "../../utils/api";
import {IMovieItem} from "../../utils/api/types";


const NowInCinema: React.FC = () => {

    const [movies, setMovies] = useState<IMovieItem[]>([])

    const fetchMovies = async () => {
        try {
            const movies = await API.getCinemaMovies();
            console.log(movies)
            setMovies(movies);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [])


    return (
        <div className={s.container}>
            {
                movies.map(m => <MovieItem key={m.id} name={m.name} imageUrl={m.imageUrl}/>)
            }
        </div>
    );
};

export default NowInCinema;