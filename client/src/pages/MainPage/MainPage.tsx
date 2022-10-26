import React, {useState} from 'react';
import Header from "../../components/Header/Header";
import Drawer from "../../components/Drawer/Drawer";
import ChooseCinemaDrawer from "../../components/ChooseCinemaDrawer/ChooseCinemaDrawer";


const MainPage: React.FC = (props) => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return (
        <div>
            <Header onClickDrawer={() => setIsCartOpened(true)}/>
            <Drawer isCartOpened={isCartOpened} onClickCloseDrawer={() => setIsCartOpened(false)}/>

            {/*<NowInCinema/>*/}

            <ChooseCinemaDrawer/>

        </div>
    )
};

export default MainPage;