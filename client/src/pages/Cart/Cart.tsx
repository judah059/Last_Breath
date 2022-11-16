import React, {useEffect, useState} from 'react';
import HeaderDrawer from "../../components/HeaderDrawer/HeaderDrawer";
import s from './Cart.module.scss'
import CartItem from "./CartItem";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import {API} from "../../utils/api";
import {IResSnack, IResTicket} from "../../utils/api/types";
import PaymentForm from "../../components/Forms/EditingProfile/PaymentForm/PaymentForm";

interface CartProps {

}


const Cart: React.FC<CartProps> = () => {

    const order = useAppSelector((state: RootState) => state.session.order);

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
            <HeaderDrawer toLinkText='Account'/>
            <div className={s.container}>
                <div className={s.items}>
                    {tickets?.length === 0 && <div>Cart is empty :(</div>}
                    {
                        tickets?.map(t => <CartItem ticket={t}/>)
                    }
                    <>
                        {
                            snacks?.map(sn => (
                                <div className={`${s.item}`}>
                                    <div className={s.left}>
                                        <img src={sn.snack_detail.logo} alt="movie" width={125}/>
                                        <div className={s.info}>
                                            <h3>{sn.snack_detail.name}</h3>
                                            <p>Quantity: {sn.amount}</p>
                                        </div>
                                    </div>
                                    <div className={s.right}>
                                        {/*<p>{ticket?.session_detail?.date}<br/>{ticket?.session_detail?.start_time} - {ticket?.session_detail?.end_time}*/}
                                        {/*</p>*/}

                                        <>
                                            <button className={s.btn}>Cancel</button>
                                            <button className={s.btn}>Pay</button>
                                        </>
                                    </div>
                                    {/*<PaymentForm isPaymentChangeFormOpened={isPaymentEditFormOpened}*/}
                                    {/*             onClickPaymentChangeFormClose={() => setPaymentEditFormOpened(false)}*/}
                                    {/*             price={ticket?.session_detail?.base_price}/>*/}
                                </div>
                            ))
                        }
                    </>

                </div>
            </div>
        </>
    );
};

export default Cart;