import React from 'react';
import OnlineCHeaderCommon from "../../components/OnlineHeaderCommon/OnlineHeaderCommon";
import CategoryItem from "./CategoryItem/CategoryItem";
import phone from "../../assets/phone.svg";
import telegram from "../../assets/telegram.svg";
import viber from "../../assets/viber.svg";
import s from './OnlineCinemaMainPage.module.scss'

const OnlineCinemaMainPage: React.FC = (props) => {
    return (
        <>
            <OnlineCHeaderCommon toLinkText={'Online'}/>
            <CategoryItem categoryName={'POPULAR SERIES'}/>
            <CategoryItem categoryName={'POPULAR SERIES'}/>
            <CategoryItem categoryName={'POPULAR SERIES'}/>
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
        </>
    )
};

export default OnlineCinemaMainPage;