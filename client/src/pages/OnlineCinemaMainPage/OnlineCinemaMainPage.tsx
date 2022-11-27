import React, {useEffect, useState} from 'react';
import OnlineCHeaderCommon from "../../components/OnlineHeaderCommon/OnlineHeaderCommon";
import CategoryItem from "./CategoryItem/CategoryItem";
import phone from "../../assets/phone.svg";
import telegram from "../../assets/telegram.svg";
import viber from "../../assets/viber.svg";
import s from './OnlineCinemaMainPage.module.scss'
import {IOnlineCinemaItems} from "../../utils/api/types";
import {OnlineAPI} from "../../utils/api";

const OnlineCinemaMainPage: React.FC = (props) => {

    const [onlineItems, setOnlineItems] = useState<IOnlineCinemaItems[]>([])

    const fetchOnlineItems = async () => {
        try {
            const onlineItems = await OnlineAPI.getOnlineWatch()
            setOnlineItems(onlineItems)
        } catch (e) {
            console.log(e)
        }
    }

    // const isEmpthy = () => {
    // }

    useEffect(() => {
        fetchOnlineItems()
    }, [])

    return (
        <>
            <OnlineCHeaderCommon toLinkText={'Online'}/>
            {onlineItems.map(o => o.films.length == 0 && o.serials.length == 0 ? <></> : <CategoryItem categoryName={o.name} films={o.films} serials={o.serials}/>)}
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