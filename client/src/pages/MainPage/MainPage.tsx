import React, {useEffect} from 'react';

import NowInCinema from "../NowInCinema/NowInCinema";
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import {useAppDispatch} from "../../utils/hooks/redux";
import {getMe} from "../../store/user/user.actions";


const MainPage: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMe())
    }, [])

    return (
        <>
            <HeaderDrawer toLinkText='Now In Cinema'/>
            <NowInCinema/>
        </>
    )
};

export default MainPage;