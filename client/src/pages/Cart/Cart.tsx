import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cart.module.scss'
import CartItem from "./CartItem";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import {API} from "../../utils/api";
import {IResTicket} from "../../utils/api/types";

interface CartProps {

}


const Cart: React.FC<CartProps> = () => {

    const order = useAppSelector((state: RootState) => state.session.order);

    const [tickets, setTickets] = useState<IResTicket[]>()

    const fetchTicket = async ()=>{
        try {
            const resTickets = await API.getTicket();
            setTickets(resTickets)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        fetchTicket()
    }, [])

    return (
        <>
            <HeaderDrawer toLinkText='Account'/>
            <div className={s.container}>
                <div className={s.items}>
                    {/*<CartItem order={order}/>*/}
                    {
                        tickets?.map(t=><CartItem ticket={t}/>)
                    }
                </div>
            </div>
        </>
    );
};

export default Cart;