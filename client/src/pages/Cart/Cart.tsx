import React from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cart.module.scss'
import CartItem from "./CartItem";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";

interface CartProps {

}


const Cart: React.FC<CartProps> = () => {

    const order = useAppSelector((state: RootState) => state.session.order);

    return (
        <>
            <HeaderDrawer toLinkText='Account'/>
            <div className={s.container}>
                <div className={s.items}>
                    <CartItem order={order}/>
                </div>
            </div>
        </>
    );
};

export default Cart;