import React from 'react';
import Popup from "reactjs-popup";
import s from "../EditForm.module.scss";
import n from "./PaymentChangeForm.module.scss";
import {SubmitHandler, useForm} from "react-hook-form";
import {iChangePayment} from "../../../../utils/api/types";
import close from "../../../../assets/closeCross.svg";
import Button from "../../../common/Buttons/Button";

interface PaymentChangeFormProps {
    isPaymentChangeFormOpened: boolean
    onClickPaymentChangeFormClose?: () => void
}

const PaymentChangeForm: React.FC<PaymentChangeFormProps> = (props) => {
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

    return (
        <Popup
            open={props.isPaymentChangeFormOpened}
            onClose={props.onClickPaymentChangeFormClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickPaymentChangeFormClose}/>
                <label>Add a card</label>
                <div className={n.line}></div>
                <div className={n.cardNumber}>
                    <div className={n.littleLabel}>
                        Card Number
                    </div>
                </div>
                <div className={s.fieldBlock}>
                    <input type={'text'} placeholder={`1234  5678  9101  1121`} className={s.field}/>
                </div>
                <div className={n.cardUnitedInfo}>
                    <div className={n.expirationDate}>
                        <div className={n.littleLabel}>
                            Expiration Date
                        </div>
                        <div className={n.fieldBlock}>
                            <input type={'text'} placeholder={`1234  5678  9101  1121`} className={s.field}/>
                        </div>
                    </div>
                    <div className={n.expirationDate}>
                        <div className={n.littleLabel}>
                            CVV
                        </div>
                        <div className={n.fieldBlock}>
                            <input type={'text'} placeholder={`123`} className={s.field}/>
                        </div>
                    </div>
                </div>
                <div className={s.buttonSave}>
                    <Button buttonContent='Add' onClickAction={clickOnSubmit}/>
                </div>
                <div className={n.underButtonText}>
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </div>
            </form>
        </Popup>
    )
};

export default PaymentChangeForm;