import React, {useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {StripeCardElement} from "@stripe/stripe-js";
import {API} from "../../../../utils/api";
import s from "../EditForm.module.scss";

interface AddCardFormProps {
    onClickAdd: ()=>void
}



const AddCardForm: React.FC<AddCardFormProps> = ({onClickAdd}) => {
    const [isFetching, setIsFetching] = useState(false)
    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        console.log(e)
        const cardElement = elements?.getElement("card");
        console.log(cardElement)

        setIsFetching(true)
        const res = await stripe?.createToken(cardElement as StripeCardElement);
        console.log(res)
        const token = res?.token?.id

        const resPayment = await API.postPayment(token)
        console.log(resPayment)
        onClickAdd()
        setIsFetching(false)
    }

    return (
        <div className={s.card}>
            <form id={'payment-form'} onSubmit={handleSubmit}>
                <label htmlFor={"card-element"}>Payment</label>
                <div className={s.line}></div>
                <CardElement className={s.cardBody} id={'card-element'}
                             options={{
                                 style: {
                                     base: {
                                         fontSize: '16px',
                                         color: '#424770',
                                         '::placeholder': {
                                             color: '#aab7c4',
                                         },
                                     },
                                     invalid: {
                                         color: '#9e2146',
                                     },
                                 },
                             }}

                />
                <div className={s.btnBlock}>
                    <button className={s.button} type="submit" disabled={!stripe || !elements}>
                        {isFetching ? 'Saving...': 'Add card'}
                    </button>
                </div>
                <div className={s.underButtonText}>
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our privacy policy.
                </div>
            </form>
        </div>
    );
};

export default AddCardForm;