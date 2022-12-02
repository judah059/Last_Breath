import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import s from "../EditForm.module.scss";

import {loadStripe} from '@stripe/stripe-js';
import {
    Elements,
} from '@stripe/react-stripe-js';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/redux";
import {RootState} from "../../../../store";
import {API} from "../../../../utils/api";
import ChooseCardForm from "./ChooseCardForm";
import {setPayment} from "../../../../store/user/user.slice";
import AddCardForm from "./AddCardForm";

interface PaymentChangeFormProps {
    isPaymentChangeFormOpened: boolean
    onClickPaymentChangeFormClose?: () => void
    totalPrice?: number | undefined
    isProfilePage?: boolean
    isSubPage?: boolean
    selectedSubId?: number
}

const PaymentForm: React.FC<PaymentChangeFormProps> = (props) => {


    const stripePromise = loadStripe('pk_test_51KnOKuJIsScGKPaNVXM3xuicCIa98Y3m73b1WMwngvj3L0WSP1WALFUz219xrvkO2V1SfdoSYrt6JlyAtKtUWznA00gR277axx');
    const payment = useAppSelector((state: RootState) => state.user.payment);


    const dispatch = useAppDispatch()
    const fetchPayment = async () => {
        const res = await API.getPayment();
        dispatch(setPayment(res))
    }


    useEffect(() => {
        fetchPayment()
    }, [])


    const [isAddCard, setIsAddCard] = useState(false)

    return (


        <Popup
            open={props.isPaymentChangeFormOpened}
            onClose={props.onClickPaymentChangeFormClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>

            <Elements stripe={stripePromise}>
                <div className={s.cont}>

                    {!isAddCard && <ChooseCardForm
                        totalPrice={props.totalPrice}
                        onClickPaymentChangeFormClose={props.onClickPaymentChangeFormClose}
                        isProfilePage={props.isProfilePage}
                        isSubPage={props.isSubPage}
                        selectedSubId={props.selectedSubId}
                    />}
                    {isAddCard && <AddCardForm onClickAdd={() => setIsAddCard(false)}/>}

                    <button className={s.addBtn} onClick={() => setIsAddCard(prev => !prev)}>
                        {!isAddCard ? 'Add another card' : 'Back to choose'}
                    </button>

                </div>
            </Elements>
        </Popup>
    )
};


export default PaymentForm;