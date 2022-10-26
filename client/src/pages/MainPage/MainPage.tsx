import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Drawer from "../../components/Drawer/Drawer";
import ChooseCinemaDrawer from "../../components/ChooseCinemaDrawer/ChooseCinemaDrawer";
import {useOutsideAlerter} from "../../utils/hooks/useOutside";
import NowInCinema from "../../components/NowInCinema/NowInCinema";
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";


const MainPage: React.FC = (props) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    const {ref, isShow, setIsShow} = useOutsideAlerter(false)

    return (
        <div>
            <Header onClickDrawer={() => setIsMenuOpened(true)} onClickCinemaDrawer={()=>setIsShow(!isShow)}/>
            <Drawer isCartOpened={isMenuOpened} onClickCloseDrawer={() => setIsMenuOpened(false)}/>

            {/*<HeaderDrawer toLinkText='Tickets'/>*/}
            <NowInCinema/>

            <ChooseCinemaDrawer refOne={ref} isShow={isShow}/>

        </div>
    )
};

export default MainPage;