import React from 'react';
import s from './Header.module.scss'
import logo from '../../assets/logo.svg'
import downArrow from '../../assets/downArrow.svg'
import rightArrow from '../../assets/rightArrow.svg'
import userLogo from '../../assets/userLogo.svg'
import burger from '../../assets/burger.svg'

const Header: React.FC = () => {
    return (
        <header className={s.header}>
            <div className={s.leftSide}>
                <div className={s.burger}>
                    <img src={burger} alt="burger"/>
                </div>
                <img src={logo} className={s.logo} alt="logo"/>
                <div className={s.breadcrumbs}>
                    <span>Last Breath</span>
                    <img src={rightArrow} alt=""/>
                    <span>Tickets</span>
                </div>
            </div>
            <div className={s.rightSide}>
                <div className={s.chooseBtn}>
                    <span>Choose city, cinema</span>
                    <img src={downArrow} alt="downArrow"/>
                </div>
                <div className={s.divider}>

                </div>
                <div className={s.user}>
                    <span>Sing In</span>
                    <img src={userLogo} alt="userLogo"/>
                </div>
            </div>
        </header>
    );
};

export default Header;