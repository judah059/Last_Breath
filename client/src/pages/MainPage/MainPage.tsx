import React from 'react';

import NowInCinema from "../NowInCinema/NowInCinema";
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";


const MainPage: React.FC = () => {

    return (
        <>
            <HeaderDrawer toLinkText='Tickets'/>
            <NowInCinema/>
        </>
    )
};

export default MainPage;