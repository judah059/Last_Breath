import React, {useState} from 'react';
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
import {loadStripe} from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';

interface PaymentChangeFormProps {
    isPaymentChangeFormOpened: boolean
    onClickPaymentChangeFormClose?: () => void
    price: number | undefined
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

    const clickOnSubmit = () => {

    }

    // const stripePromise = loadStripe('pk_test_51KnOKuJIsScGKPaNVXM3xuicCIa98Y3m73b1WMwngvj3L0WSP1WALFUz219xrvkO2V1SfdoSYrt6JlyAtKtUWznA00gR277axx');

    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: 'sk_test_51KnOKuJIsScGKPaNtwvJrsnekggV9qz5amBYnM7bnN1d4A9Dn1myTq3RKdODWi9obQ0wDXBH4qBdTyBrncbUt6FT00JMkpjZTr',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
    };


    return (
        <Popup
            open={props.isPaymentChangeFormOpened}
            onClose={props.onClickPaymentChangeFormClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>

            <Elements stripe={stripePromise}>
                <MyForm/>
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
        // @ts-ignore
        const res = await stripe?.createToken(cardElement);
        console.log(res)

    }

    return (
        <div className={s.card}>
            <form id={'payment-form'} onSubmit={handleSubmit}>
                <label htmlFor={"card-element"}>Payment</label>
                <div className={s.line}></div>
                {/*<div className={s.cardNumber}>*/}
                {/*    <div className={s.cardNumberText}>*/}
                {/*        Card Number*/}
                {/*    </div>*/}
                {/*    <div className={s.cardBody}>*/}
                {/*        <CardNumberElement id={'card-element'}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <CardElement className={s.cardBody} id={'card-element'}/>
                <button className={s.button} type="submit" disabled={!stripe || !elements}>Pay</button>
                <div className={s.underButtonText}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </div>
            </form>
        </div>
    );
};


export default PaymentForm;