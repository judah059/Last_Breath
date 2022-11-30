import React, {useEffect, useState} from 'react';
import s from './SubscriptionPage.module.scss'
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";
import logo from "../../assets/logo.svg";
import {useNavigate} from "react-router-dom";
import Button from "../../components/common/Buttons/Button";
import {useAuth} from "../../utils/hooks/useAuth";

interface SubscriptionPageProps {

}

interface ISubscription {
    name: string
    price: string
    quality: string
    downloadSpeed: string
}


const SubscriptionPage: React.FC<SubscriptionPageProps> = () => {

    const [currentSubscription, setCurrentSubscription] = useState<ISubscription>()
    const [active, setActive] = useState(false)
    const [active1, setActive1] = useState(false)

    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/online')
    }

    const onClickAction = (name: string) => {
        if (name === 'Standard') {
            setActive(true)
            setActive1(false)
            setCurrentSubscription({
                name: name,
                price: '5',
                quality: '720',
                downloadSpeed: '5'
            })
            console.log(currentSubscription)
        } else if (name === 'Premium') {
            setActive1(true)
            setActive(false)
            setCurrentSubscription({
                name: name,
                price: '10',
                quality: '1080',
                downloadSpeed: '10'
            })
            console.log(currentSubscription)
        }
    }

    const onClickProceed = () => {
        !active && !active1 ? alert('Please choose Subscription plane') : console.log()
    }

    const isAuth = useAuth()

    useEffect(() => {
        if (!isAuth) {
            return navigate("/online");
        }
    }, [!isAuth]);

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <img src={logo} onClick={mainLoader} className={s.logo} alt="logo"/>
                <div className={s.lefSide} onClick={mainLoader}>
                    Cancel
                </div>
            </div>
            <div className={s.planText}>
                Choose Plan
            </div>
            <div className={s.wrapperBox}>
                <div className={s.textLine}>
                    <div>

                    </div>
                    <div>
                        Price
                    </div>
                    <div>
                        Quality
                    </div>
                    <div>
                        Download Speed
                    </div>
                </div>
                <SubscriptionItem active={active} onClickAction={onClickAction} subName={'Standard'} price={'5'} quality={'720'} downloadSpeed={'5'}/>
                <SubscriptionItem active={active1} onClickAction={onClickAction} subName={'Premium'} price={'10'} quality={'1080'} downloadSpeed={'10'}/>
            </div>
            <div className={s.lowerSide}>
                <Button buttonContent={'PROCEED'} onClickAction={onClickProceed}/>
            </div>
        </div>
    );
};

export default SubscriptionPage;