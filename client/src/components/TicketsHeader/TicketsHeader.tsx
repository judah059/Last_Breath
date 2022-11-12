import React from 'react';
import s from './TicketsHeader.module.scss'
import {NavLink, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";
import rightArrow from "../../assets/rightArrowBlack.svg";

const TicketsHeader: React.FC = (props) => {
    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/main')
    }

    return (
        <div className={s.header}>
            <div className={s.leftSide}>
                <img src={logo} onClick={mainLoader} className={s.logo} alt="logo"/>
                <div className={s.breadcrumbs}>
                    <span>
                        <NavLink to='/'>Last Breath</NavLink>
                    </span>
                    <img src={rightArrow} alt=""/>
                    <span>Tickets</span>
                    <img src={rightArrow} alt=""/>
                    <span>Order</span>
                </div>
            </div>
        </div>
    );
};

export default TicketsHeader;