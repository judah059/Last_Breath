import React from 'react';
import s from './StartPage.module.scss'
import {useNavigate} from "react-router-dom";
import logo from "../../assets/logo.svg";



const StartPage: React.FC = () => {

    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/main')
    }

    const cinemaOnlineLoader = () => {
        navigate('/online')
    }

    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.logo_name}>
                    <img src={logo} className={s.logo} alt="logo"/>
                    <div className={s.name}>Cinema "Last Breath"</div>
                </div>
                <div className={s.buttons}>
                    <div className={s.buy_ticket}>
                        <button onClick={mainLoader}>BUY TICKET</button>
                    </div>
                    <div className={s.watch_online}>
                        <button onClick={cinemaOnlineLoader}>WATCH ONLINE</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default StartPage;