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
    const [isPaymentEditFormOpened, setPaymentEditFormOpened] = useState(false)

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

    const onClickSnackRemove = async (id: number) => {
        console.log(id)
        setSnacks(snacks?.filter(s => s.id !== id))
        const res = await API.removeBoughtSnack(id)
    }

    const onClickTicketRemove = async (id: number) => {
        setTickets(tickets?.filter(s => s.id !== id))
        const res = await API.removeTicket(id)
    }

    useEffect(() => {
        fetchTicket()
    }, [])


    const snacksTotalPrice = snacks?.filter(t => t.is_payed === false).reduce((a, b) => a + b.total_price, 0) || 0
    const ticketsTotalPrice = tickets?.filter(t => t.is_payed === false).reduce((a, b) => a + b.total_price, 0) || 0
    const totalPrice = snacksTotalPrice + ticketsTotalPrice;
    console.log(totalPrice)
    return (
        <>
            <HeaderDrawer toLinkText='Account'/>
            <div className={s.container}>
                {
                    totalPrice !== 0 && <div className={s.total}>
                        <h3>Total Price: <span>₴{totalPrice}</span></h3>
                        <button className={s.btn} onClick={() => setPaymentEditFormOpened(true)}>Pay</button>

                    </div>
                }
                <div className={s.items}>
                    {(tickets?.length === 0 && snacks?.length === 0) && <div>Cart is empty :(</div>}
                    {
                        tickets?.filter(t => t.is_payed === false).map(t => <CartItem ticket={t}
                                                                                      onClickTicketRemove={() => onClickTicketRemove(t.id)}/>)
                    }
                    <>
                        {
                            snacks?.filter(s => s.is_payed === false).map(sn => (
                                <div className={`${s.item}`}>
                                    <div className={s.left}>
                                        <img src={sn.snack_detail.logo} alt="movie" width={125}/>
                                        <div className={s.info}>
                                            <h3>{sn.snack_detail.name}</h3>
                                            <p>Quantity: {sn.amount}</p>
                                            <p>Total Price: ₴{sn.total_price}</p>
                                        </div>
                                    </div>
                                    <div className={s.right}>
                                        <>
                                            <button className={s.btn} onClick={() => onClickSnackRemove(sn.id)}>Cancel
                                            </button>
                                        </>
                                    </div>
                                </div>
                            ))
                        }
                    </>

                </div>
                <PaymentForm isPaymentChangeFormOpened={isPaymentEditFormOpened}
                             onClickPaymentChangeFormClose={() => setPaymentEditFormOpened(false)}
                             totalPrice={totalPrice}/>
            </div>
        </>
    );
};

export default Cart;