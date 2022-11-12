import React, {useEffect, useState} from 'react';
import s from './NowInCinema.module.scss'
import MovieItem from "./MovieItem";
import {API} from "../../utils/api";
import {IMovieItem} from "../../utils/api/types";
import {useNavigate} from "react-router-dom";


const NowInCinema: React.FC = () => {

    const [movies, setMovies] = useState<IMovieItem[]>([])

    const fetchMovies = async () => {
        try {
            const movies = await API.getCinemaMovies();
            setMovies(movies);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }


    useEffect(() => {
        fetchMovies()
    }, [])

    const navigate = useNavigate();
    return (
        <div className={s.container}>
            {
                movies.map(m =><div onClick={() => navigate(`movies/${m.id}`)}><MovieItem key={m.id} name={m.name} poster={m.poster} /></div> )
            }
        </div>
    );
};

export default NowInCinema;