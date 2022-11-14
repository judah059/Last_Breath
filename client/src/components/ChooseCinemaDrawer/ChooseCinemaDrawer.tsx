import React, {useEffect, useState} from 'react';
import s from './ChooseCinemaDrawer.module.scss'
import {API} from "../../utils/api";
import {ICinema} from "../../utils/api/types";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {setCinema} from "../../store/cinema/cinema.slice";
import {RootState} from "../../store";
import {useNavigate} from "react-router-dom";


interface ChooseCinemaDrawerProps {
    refOne: React.Ref<HTMLDivElement>
    isShow: boolean
    onClose: ()=> void
}


const ChooseCinemaDrawer: React.FC<ChooseCinemaDrawerProps> = ({isShow, refOne, onClose}) => {

    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState<string>('Kharkiv')
    const [cinemas, setCinemas] = useState<ICinema[]>([])
    const [filteredCinemas, setFilteredCinemas] = useState<ICinema[]>([])

    const {cinema, isCinemaPage} = useAppSelector((state: RootState) => state.session);

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const fetchCinema = async () => {
        try {
            const cinemas = await API.getCinemas();
            setCinemas(cinemas)

            const filteredCinemas = cinemas.filter(c => c.location_details.city === selectedCity)
            setFilteredCinemas(filteredCinemas)

            const cities = Array.from(new Set(cinemas.map(c => c.location_details.city)))
            setCities(cities)
        } catch (e) {
            console.log(e)
            alert(e)
        }
    }


    useEffect(() => {
        fetchCinema()
    }, [])


    const onClickSelectedCity = (city: string) => {
        setSelectedCity(city)
        const filteredCinemas = cinemas.filter(c => c.location_details.city === city)
        console.log(filteredCinemas)
        setFilteredCinemas(filteredCinemas)
    }


    const onClickCinema = (chooseCinema: ICinema) => {
        if (isCinemaPage) {
            navigate(`/cinema/${chooseCinema?.id}`)
            onClose()
            return
        }
        dispatch(setCinema(chooseCinema))
        onClose()
    }


    return (
        <div className={`${s.overlay} ${isShow ? s.overlayOut : ""}`}>
            <div className={s.drawer} ref={refOne}>
                <div className={s.city}>
                    <h2>City:</h2>
                    <ul>
                        {
                            cities?.map((c, i) => (
                                <li key={i}
                                    onClick={() => onClickSelectedCity(c)}
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
                            filteredCinemas?.map((c, i) => <li key={i} onClick={() => onClickCinema(c)}>
                                <p>{c.name}</p>
                                <p>{`${c.location_details.street} ${c.location_details.number === 0 ? '' : c.location_details.number}`}</p>
                            </li>)
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ChooseCinemaDrawer;