import React from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cart.module.scss'
import CartItem from "./CartItem";

interface CartProps {

}


const Cart: React.FC<CartProps> = () => {
    return (
        <>
            <HeaderDrawer toLinkText='Account'/>
            <div className={s.container}>
                <div className={s.items}>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                    <CartItem/>
                </div>
            </div>
        </>
    );
};

export default Cart;