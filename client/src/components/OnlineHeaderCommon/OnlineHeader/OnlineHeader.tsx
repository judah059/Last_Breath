import React from 'react';
import s from './OnlineHeader.module.scss'
import logo from '../../../assets/logo.svg'
import rightArrow from '../../../assets/rightArrow.svg'
import userLogo from '../../../assets/userLogo.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../../utils/hooks/useAuth";
import {useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";

interface HeaderProps {
    toLinkText: string
    onClickSigningOpen: () => void
    onClickOpenUserDrawer: () => void
}

const OnlineHeader: React.FC<HeaderProps> = ({
                                           toLinkText,
                                           onClickSigningOpen,
                                           onClickOpenUserDrawer
                                       }) => {
    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/online')
    }

    const onClickSignUpOpenHandler = () => {
        document.body.style.overflow = 'hidden';
        onClickSigningOpen()
    }

    const onOpenPopupHandler = () => {
        document.body.style.overflow = 'hidden';
        onClickSigningOpen()
    }

    const isAuth = useAuth()

    const {cinema} = useAppSelector((state: RootState) => state.cinema);

    return (
        <header className={s.header}>
            <div className={s.leftSide}>
                <img src={logo} onClick={mainLoader} className={s.logo} alt="logo"/>
                <div className={s.breadcrumbs}>
                    <span>
                        <NavLink to='/'>Last Breath</NavLink>
                    </span>
                    <img src={rightArrow} alt=""/>
                    <span>{toLinkText}</span>
                </div>
            </div>
            <div className={s.rightSide}>
                {!isAuth && <button onClick={onClickSignUpOpenHandler}>JOIN</button>}
                <div className={s.divider}>

                </div>
                <div className={s.user}>
                    {
                        isAuth ?
                            <img src={userLogo} alt="userLogo" onClick={onClickOpenUserDrawer}/> :
                            <span onClick={onOpenPopupHandler}>Sing In</span>
                    }
                </div>
            </div>
        </header>
    );
};

export default OnlineHeader;