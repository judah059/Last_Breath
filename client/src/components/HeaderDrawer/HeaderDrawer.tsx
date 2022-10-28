import React, {useState} from 'react';
import Header from "./Header/Header";
import Drawer from "./Drawer/Drawer";
import {useOutsideAlerter} from "../../utils/hooks/useOutside";
import ChooseCinemaDrawer from "../ChooseCinemaDrawer/ChooseCinemaDrawer";
import Signing from "../Forms/Signing";
import UserDrawer from "../UserDrawer/UserDrawer";

interface HeaderDrawerProps {
    toLinkText: string
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = (props) => {

    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isUserDrawerOpened, setIsUserDrawerOpened] = useState(false);
    const [isSigningOpened, setIsSigningOpened] = useState(false);
    const {ref, isShow, setIsShow} = useOutsideAlerter(false);
    const [formType, setFormType] = useState<"signIn" | "signUp">("signIn");





    return (
        <div>
            <Header toLinkText={props.toLinkText}
                    onClickDrawer={() => setIsMenuOpened(true)}
                    onClickCinemaDrawer={() => setIsShow(!isShow)}
                    onClickSigningOpen={() => setIsSigningOpened(true)}/>
            <Drawer isCartOpened={isMenuOpened}
                    onClickCloseDrawer={() => setIsMenuOpened(false)}
                    onClickAuth={() => setFormType("signIn")}
                    onClickSigningOpen={() => setIsSigningOpened(true)}
            />

            <ChooseCinemaDrawer
                refOne={ref}
                isShow={isShow}/>

            <Signing formType={formType}
                     setFormType={setFormType}
                     isSigningOpened={isSigningOpened}
                     onClickSigningClose={() => setIsSigningOpened(false)}/>

            <UserDrawer isUserDrawerOpened={isUserDrawerOpened}
                        onClickCloseUserDrawer={() => setIsUserDrawerOpened(false)}/>
        </div>
    )
};

export default HeaderDrawer;