import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from '../Cart/Cart.module.scss'
import CartItem from "../Cart/CartItem";
import {IResSnack, IResTicket} from "../../utils/api/types";
import {API} from "../../utils/api";

interface PaymentHistoryProps {

}


const PaymentHistory: React.FC<PaymentHistoryProps> = () => {

    const [tickets, setTickets] = useState<IResTicket[]>()
    const [snacks, setSnacks] = useState<IResSnack[]>()

    const fetchTicket = async () => {
        try {
            const resTickets = await API.getTicket();
            setTickets(resTickets)

            const resSnacks = await API.getBoughtSnacks();
            setSnacks(resSnacks)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTicket()
    }, [])

    return (
        <>
            <HeaderDrawer toLinkText='Payment history'/>
            <div className={s.container}>
                <div className={s.items}>
                    {
                        tickets?.filter(t => t.is_payed === true).map(t=> <CartItem disableBtn ticket={t}/>)
                    }
                    {
                        snacks?.filter(s => s.is_payed === true).map(sn => (
                            <div className={`${s.item}`}>
                                <div className={s.left}>
                                    <img src={sn.snack_detail.logo} alt="movie" width={125} className={s.snackImg}/>
                                    <div className={s.info}>
                                        <h3>{sn.snack_detail.name}</h3>
                                        <p>Quantity: {sn.amount}</p>
                                        <p>Total Price: ₴{sn.total_price}</p>
                                    </div>
                                </div>
                                <div className={s.right}>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default PaymentHistory;