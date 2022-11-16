import React, {useEffect} from 'react';

import NowInCinema from "../NowInCinema/NowInCinema";
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import {useAppDispatch} from "../../utils/hooks/redux";
import {getMe} from "../../store/user/user.actions";
import {getWithExpiry} from "../../utils/localStorage";
import {Route, Routes} from "react-router-dom";
import MoviePage from "../MoviePage/MoviePage";
import {setPayment} from "../../store/user/user.slice";
import {API} from "../../utils/api";


const MainPage: React.FC = () => {

    const dispatch = useAppDispatch()

    const token = getWithExpiry('access_token')



    useEffect(() => {
        dispatch(getMe(token))

    }, [])

    return (
        <>
            <HeaderDrawer toLinkText='Now In Cinema'/>
           <NowInCinema/>
        </>
    )
};

export default MainPage;