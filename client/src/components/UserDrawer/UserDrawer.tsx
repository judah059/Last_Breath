import React from 'react';
import s from "./UserDrawer.module.scss";
import logo from "../../assets/logo.svg";
import userDefaultLogo from "../../assets/userDefaultLogo.svg";
import help from "../../assets/help.svg";
import cart from "../../assets/cart.svg";
import account from "../../assets/account.svg";
import exit from "../../assets/exit.svg";
import closeBtn from "../../assets/closeBtn.svg";
import {NavLink} from "react-router-dom";


interface UserDrawerProps {
    isUserDrawerOpened: boolean
    onClickCloseUserDrawer: () => void
}


const UserDrawer: React.FC<UserDrawerProps> = ({isUserDrawerOpened, onClickCloseUserDrawer}) => {
    return (
        <div className={`${s.overlay} ${isUserDrawerOpened ? s.overlayOut : ""}`}>
            <div className={s.drawer}>
                <div className={s.top}>
                    <img src={logo} alt="logo"/>
                    <div className={s.blockUser}>
                        <img src={userDefaultLogo} alt="userDefaultLogo"/>
                        <div className={s.info}>
                            <p className={s.name}>User</p>
                            <p className={s.email}>useruser@mail.com</p>
                        </div>
                    </div>
                    <div className={s.menu}>
                        <ul>
                            <li>
                                <img src={cart} alt="cart"/>
                                <p>Cart</p>
                            </li>
                            <li>
                                <img src={account} alt="account"/>
                                <p><NavLink to='/profile'>Account</NavLink></p>
                            </li>
                            <li>
                                <img src={help} alt="help" width="41px"/>
                                <p>Help</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={s.bottom}>
                    <img src={exit} alt="help"/>
                    <p>Exit</p>
                </div>
                <div className={s.closeBtn} onClick={onClickCloseUserDrawer}>
                    <img src={closeBtn} alt="closeBtn"/>
                </div>
            </div>
        </div>
    );
};

export default UserDrawer;