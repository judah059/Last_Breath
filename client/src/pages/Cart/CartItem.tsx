import React, {useState} from 'react';
import s from "./Cart.module.scss";
import mov from "../../assets/tempMovieImage.jpg";
import {IOrder} from "../../store/session/session.types";
import PaymentForm from "../../components/Forms/EditingProfile/PaymentForm/PaymentForm";

interface CartItemProps {
    disableBtn?: boolean
    order?: IOrder | null
}


const CartItem: React.FC<CartItemProps> = ({disableBtn = false, order = {}}) => {
    const [isPaymentEditFormOpened, setPaymentEditFormOpened] = useState(false)
    return (
        <div className={`${s.item} ${disableBtn && s.disabled}`}>
            <div className={s.left}>
                <img src={order?.session?.movie_poster} alt="movie" width={125}/>
                <div className={s.info}>
                    <h3>{order?.city},{order?.session?.movie_name}</h3>
                    <p className={s.location}>{order?.session?.cinemahall_detail.cinema_name}</p>
                    <p className={s.place}>
                        {order?.tickets?.map(t => <div>{t.seat_number}st place, {t.seat_row}st row</div>)}
                    </p>
                    <p className={s.addition}>
                        {order?.snackOrder?.map(s => <div>{s.name}</div>)}
                    </p>
                </div>
            </div>
            <div className={s.right}>
                <p>{order?.session?.date}<br/>{order?.session?.start_time} - {order?.session?.end_time}</p>
                {
                    !disableBtn && (
                        <>
                            <button className={s.btn}>Cancel</button>
                            <button className={s.btn} onClick={()=>setPaymentEditFormOpened(true)}>Pay</button>
                        </>
                    )
                }
            </div>
            <PaymentForm isPaymentChangeFormOpened={isPaymentEditFormOpened}
                         onClickPaymentChangeFormClose={() => setPaymentEditFormOpened(false)} price={order?.session?.base_price}/>
        </div>
    );
};

export default CartItem;