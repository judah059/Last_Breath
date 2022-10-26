import React, {useState} from 'react';
import Header from "./Header/Header";
import Drawer from "./Drawer/Drawer";
import {useOutsideAlerter} from "../../utils/hooks/useOutside";
import ChooseCinemaDrawer from "../ChooseCinemaDrawer/ChooseCinemaDrawer";

interface HeaderDrawerProps {
    toLinkText: string
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = (props) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const {ref, isShow, setIsShow} = useOutsideAlerter(false)

    return (
        <div>
            <Header toLinkText={props.toLinkText} onClickDrawer={() => setIsMenuOpened(true)}
                    onClickCinemaDrawer={() => setIsShow(!isShow)}/>

            <Drawer isCartOpened={isMenuOpened} onClickCloseDrawer={() => setIsMenuOpened(false)}/>
            <ChooseCinemaDrawer refOne={ref} isShow={isShow}/>
        </div>
    )
};

export default HeaderDrawer;