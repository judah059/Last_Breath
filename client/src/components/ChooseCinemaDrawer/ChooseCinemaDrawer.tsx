import React, {useEffect, useState} from 'react';
import s from './ChooseCinemaDrawer.module.scss'
import {API} from "../../utils/api";
import {ICinema} from "../../utils/api/types";


interface ChooseCinemaDrawerProps {
    refOne: React.Ref<HTMLDivElement>;
    isShow: boolean
}


const ChooseCinemaDrawer: React.FC<ChooseCinemaDrawerProps> = ({isShow, refOne}) => {

    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState<string>('Kharkiv')
    const [cinemas, setCinemas] = useState<ICinema[]>([])


    const fetchCities = async (city?: string) => {
        try {
            const cinemas = await API.getCinemas(city);
            const cities = Array.from(new Set(cinemas.map(el => el.city)))
            setCities(cities);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    const fetchCinemas = async (city?: string) => {
        try {
            const cinemas = await API.getCinemas(city);
            setCinemas(cinemas);
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }

    useEffect(() => {
        fetchCities()
    }, [])

    useEffect(() => {
        fetchCinemas(selectedCity)
    }, [selectedCity])


    return (
        <div className={`${s.overlay} ${isShow ? s.overlayOut : ""}`}>
            <div className={s.drawer} ref={refOne}>
                <div className={s.city}>
                    <h2>City:</h2>
                    <ul>
                        {
                            cities?.map((c, i) => (
                                <li key={i}
                                    onClick={() => setSelectedCity(c)}
                                    className={c === selectedCity ? s.active : ''}
                                >
                                    {c}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={s.cinema}>
                    <h2>Cinema:</h2>
                    <ul>

                        {
                            cinemas?.map(c => <li>
                                <p>{c.cinemaName}</p>
                                <p>{c.cinemaStreet}</p>
                            </li>)
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChooseCinemaDrawer;