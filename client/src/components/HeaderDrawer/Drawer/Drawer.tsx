import React from 'react';
import s from './Drawer.module.scss'
import logo from '../../../assets/logo.svg'
import phone from '../../../assets/phone.svg'
import telegram from '../../../assets/telegram.svg'
import viber from '../../../assets/viber.svg'
import closeBtn from '../../../assets/closeBtn.svg'
import {NavLink} from "react-router-dom";


interface DrawerProps {
    isCartOpened: boolean,
    onClickCloseDrawer: () => void
    onClickAuth: () => void
    onClickSigningOpen: () => void
}


const Drawer: React.FC<DrawerProps> = ({isCartOpened, onClickCloseDrawer, onClickAuth, onClickSigningOpen}) => {

    const onClickSignUpOpenHandler = () => {
        document.body.style.overflow = 'hidden';
        onClickAuth()
        onClickSigningOpen()
    }

    return (
        <div className={`${s.overlay} ${isCartOpened ? s.overlayOut : ""}`}>
            <div className={s.drawer}>
                <div className={s.top}>
                    <img src={logo} alt="logo"/>
                    <div className={s.title}>Cinema “Last Breath”</div>
                    <button onClick={onClickSignUpOpenHandler}>Authorization</button>
                </div>
                <div className={s.menu}>
                    <ul>
                        <li><NavLink to='/main'>Now in cinema</NavLink></li>
                        <li>Promotions and discounts</li>
                        <li>Help</li>
                        <li><NavLink to='/about-company'>About Company</NavLink></li>
                    </ul>
                </div>

                <div className={s.bottom}>
                    <div className={s.divider}>
                        <p>Support</p>
                    </div>
                    <ul className={s.contacts}>
                        <li><img src={phone} alt="phone"/><span>0 800 500 500</span></li>
                        <li><img src={telegram} alt="phone"/><span>Telegram</span></li>
                        <li><img src={viber} alt="phone"/><span>Viber</span></li>
                    </ul>
                </div>

                <div className={s.closeBtn} onClick={onClickCloseDrawer}>
                    <img src={closeBtn} alt="closeBtn"/>
                </div>
            </div>
        </div>
    );
};

export default Drawer;