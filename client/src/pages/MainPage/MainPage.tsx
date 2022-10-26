import React, {useState} from 'react';
import NowInCinema from "../../components/NowInCinema/NowInCinema";
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";


const MainPage: React.FC = (props) => {

    const [isCartOpened, setIsCartOpened] = useState(false);

    return (
        <div>
            <HeaderDrawer toLinkText='Tickets'/>

            <NowInCinema/>

        </div>
    )
};

export default MainPage;