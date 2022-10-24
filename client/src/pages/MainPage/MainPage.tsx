import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Drawer from "../../components/Drawer/Drawer";
import {Route, Routes} from "react-router-dom";
import StartPage from "../StartPage/StartPage";

const MainPage: React.FC = (props) => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return(
        <div>
            <Header onClickDrawer={()=>setIsCartOpened(true)}/>
            <Drawer isCartOpened={isCartOpened} onClickCloseDrawer={()=>setIsCartOpened(false)}/>
        </div>
    )
};

export default MainPage;