import React, {useEffect, useState} from 'react';
import s from './SubscriptionPage.module.scss'
import SubscriptionItem from "./SubscriptionItem/SubscriptionItem";
import logo from "../../assets/logo.svg";
import {useNavigate} from "react-router-dom";
import Button from "../../components/common/Buttons/Button";
import {useAuth} from "../../utils/hooks/useAuth";
import {API} from "../../utils/api";
import {ISub} from "../../utils/api/types";
import {convertSubPlanName} from "../../utils/ConvertSubNameToFull";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import PaymentForm from "../../components/Forms/EditingProfile/PaymentForm/PaymentForm";

interface SubscriptionPageProps {

}


const SubscriptionPage: React.FC<SubscriptionPageProps> = () => {

    const [selectedPlan, setSelectedPlan] = useState('ST')
    const [selectedSubId, setSelectedSubId] = useState(1)
    const [subscriptions, setSubscriptions] = useState<ISub[]>([])

    const [isPaymentEditFormOpened, setPaymentEditFormOpened] = useState(false)
    const {payment} = useAppSelector((state: RootState) => state.user);

    const navigate = useNavigate()

    const mainLoader = () => {
        navigate('/online')
    }

    const onClickAction = (name: string, id: number) => {
        setSelectedPlan(name)
        setSelectedSubId(id)
    }


    const onClickProceed = async () => {
        try {
            setPaymentEditFormOpened(true)

        } catch (e) {
            console.log(e)
        }
    }

    const isAuth = useAuth()

    useEffect(() => {
        if (!isAuth) {
            return navigate("/online");
        }
    }, [!isAuth]);


    useEffect(() => {
        fetchSubs()
    }, [])

    const fetchSubs = async () => {
        try {
            let subs = await API.getSubs()
            setSubscriptions(subs)
        } catch (e) {
            console.log(e)
        }
    }

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

                {
                    subscriptions.map(s => <SubscriptionItem key={s.id}
                                                             id={s.id}
                                                             subName={s.sub_type}
                                                             price={s.price}
                                                             quality={s.quality}
                                                             downloadSpeed={s.download_speed}
                                                             active={selectedPlan === s.sub_type}
                                                             onClickAction={onClickAction}/>)
                }

            </div>
            <div className={s.lowerSide}>
                <Button buttonContent={'PROCEED'} onClickAction={onClickProceed}/>
            </div>

            <PaymentForm isPaymentChangeFormOpened={isPaymentEditFormOpened}
                         onClickPaymentChangeFormClose={() => setPaymentEditFormOpened(false)}
                         totalPrice={subscriptions.find(s => s.sub_type === selectedPlan)?.price}
                         isSubPage
                         selectedSubId={selectedSubId}
            />
        </div>
    );
};

export default SubscriptionPage;