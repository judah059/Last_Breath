import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Drawer from "../../components/Drawer/Drawer";
import ChooseCinemaDrawer from "../../components/ChooseCinemaDrawer/ChooseCinemaDrawer";
import {useOutsideAlerter} from "../../utils/hooks/useOutside";
import NowInCinema from "../../components/NowInCinema/NowInCinema";


const MainPage: React.FC = (props) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const {ref, isShow, setIsShow} = useOutsideAlerter(false)

    return (
        <div>
            <Header onClickDrawer={() => setIsMenuOpened(true)} onClickCinemaDrawer={()=>setIsShow(!isShow)}/>
            <Drawer isCartOpened={isMenuOpened} onClickCloseDrawer={() => setIsMenuOpened(false)}/>

            <NowInCinema/>

            <ChooseCinemaDrawer refOne={ref} isShow={isShow}/>

        </div>
    )
};

export default MainPage;