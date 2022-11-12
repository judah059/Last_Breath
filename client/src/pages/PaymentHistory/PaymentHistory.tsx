import React from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from '../Cart/Cart.module.scss'
import CartItem from "../Cart/CartItem";

interface PaymentHistoryProps {

}


const PaymentHistory: React.FC<PaymentHistoryProps> = () => {
    return (
        <>
            <HeaderDrawer toLinkText='Payment history'/>
            <div className={s.container}>
                <div className={s.items}>
                    <CartItem disableBtn/>
                    <CartItem disableBtn/>

                </div>
            </div>
        </>
    );
};

export default PaymentHistory;