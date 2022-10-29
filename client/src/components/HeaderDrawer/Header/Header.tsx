import React from 'react';
import s from './Header.module.scss'
import logo from '../../../assets/logo.svg'
import downArrow from '../../../assets/downArrow.svg'
import rightArrow from '../../../assets/rightArrow.svg'
import userLogo from '../../../assets/userLogo.svg'
import burger from '../../../assets/burger.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../../../utils/hooks/useAuth";

interface HeaderProps {
    onClickDrawer: () => void
    onClickCinemaDrawer: () => void
    toLinkText: string
    onClickSigningOpen: () => void
    onClickOpenUserDrawer: () => void
}

const Header: React.FC<HeaderProps> = ({
                                           onClickDrawer,
                                           onClickCinemaDrawer,
                                           toLinkText,
                                           onClickSigningOpen,
                                           onClickOpenUserDrawer
                                       }) => {
    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/main')
    }


    const onOpenPopupHandler = () => {
        document.body.style.overflow = 'hidden';
        onClickSigningOpen()
    }

    const isAuth = useAuth()

    return (
        <header className={s.header}>
            <div className={s.leftSide}>
                <div className={s.burger} onClick={onClickDrawer}>
                    <img src={burger} alt="burger"/>
                </div>
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
                <div className={s.chooseBtn} onClick={onClickCinemaDrawer}>
                    <span>Choose city, cinema</span>
                    <img src={downArrow} alt="downArrow"/>
                </div>
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

export default Header;