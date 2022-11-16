import React, {useEffect, useState} from 'react';
import Popup from "reactjs-popup";
import s from "../EditForm.module.scss";
import n from "./PaymentForm.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {iChangePayment} from "../../../../utils/api/types";
import close from "../../../../assets/closeCross.svg";
import Button from "../../../common/Buttons/Button";
// import {CardElement, useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
// import {loadStripe} from "@stripe/stripe-js";
// import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeCardElement} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/redux";
import {RootState} from "../../../../store";
import {API} from "../../../../utils/api";
import ChooseCardForm from "./ChooseCardForm";
import {setPayment} from "../../../../store/user/user.slice";

interface PaymentChangeFormProps {
    isPaymentChangeFormOpened: boolean
    onClickPaymentChangeFormClose?: () => void
    totalPrice: number | undefined
}

const PaymentForm: React.FC<PaymentChangeFormProps> = (props) => {


    const {handleSubmit, formState: {errors}} = useForm<iChangePayment>()

    const onSubmit: SubmitHandler<iChangePayment> = async formData => {
        try {
            props.onClickPaymentChangeFormClose?.()
        } catch (e) {
            console.log((e as Error).message)
        }
    }


    const stripePromise = loadStripe('pk_test_51KnOKuJIsScGKPaNVXM3xuicCIa98Y3m73b1WMwngvj3L0WSP1WALFUz219xrvkO2V1SfdoSYrt6JlyAtKtUWznA00gR277axx');
    const payment = useAppSelector((state: RootState) => state.user.payment);


    const dispatch = useAppDispatch()
    const fetchPayment = async () => {
        const res = await API.getPayment();
        dispatch(setPayment(res))
    }




    useEffect(()=>{
        fetchPayment()
    }, [payment])

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
                    {
                        payment.length === 0 ? <MyForm/> : <ChooseCardForm totalPrice={props.totalPrice}
                                                                           onClickPaymentChangeFormClose={props.onClickPaymentChangeFormClose}/>
                    }
                </div>
            </Elements>
        </Popup>
    )
};


const MyForm: React.FC = () => {
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(e)
        const cardElement = elements?.getElement("card");
        console.log(cardElement)

        const res = await stripe?.createToken(cardElement as StripeCardElement);
        console.log(res)
        const token = res?.token?.id

        const resPayment = await API.postPayment(token)
        console.log(resPayment)

    }

    return (
        // <div className={s.card}>
        //     <form id={'payment-form'} onSubmit={handleSubmit}>
        //         <label htmlFor={"card-element"}>Payment</label>
        //         <div className={s.line}></div>
        //         <CardElement className={s.cardBody} id={'card-element'}/>
        //         <button className={s.button} type="submit" disabled={!stripe || !elements}>Pay</button>
        //         <div className={s.underButtonText}>
        //             Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
        //         </div>
        //     </form>
        // </div>
        <form onSubmit={handleSubmit} className={s.myForm}>
            <CardElement/>
            <div className={s.btnBlock}>
                <button type="submit" disabled={!stripe || !elements} className={s.buttonSave}>
                    Add card
                </button>
            </div>
        </form>
    );
};


export default PaymentForm;