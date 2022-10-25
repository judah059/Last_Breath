import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Drawer from "../../components/Drawer/Drawer";
import NowInCinema from "../../components/NowInCinema/NowInCinema";


const MainPage: React.FC = (props) => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return (
        <div>
            <Header onClickDrawer={() => setIsCartOpened(true)}/>
            <Drawer isCartOpened={isCartOpened} onClickCloseDrawer={() => setIsCartOpened(false)}/>

            <NowInCinema/>

        </div>
    )
};

export default MainPage;