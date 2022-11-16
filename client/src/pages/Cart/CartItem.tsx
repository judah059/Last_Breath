import React, {useState} from 'react';
import s from "./Cart.module.scss";
import mov from "../../assets/tempMovieImage.jpg";
import {IOrder} from "../../store/session/session.types";
import PaymentForm from "../../components/Forms/EditingProfile/PaymentForm/PaymentForm";
import {IResTicket} from "../../utils/api/types";
import {useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";

interface CartItemProps {
    disableBtn?: boolean
    ticket?: IResTicket | null
    onClickTicketRemove?: ()=> void
}


const CartItem: React.FC<CartItemProps> = ({disableBtn = false, ticket = {}, onClickTicketRemove}) => {

    return (
        <div className={`${s.item} ${disableBtn && s.disabled}`}>
            <div className={s.left}>
                <img src={ticket?.session_detail?.movie_poster} alt="movie" width={125}/>
                <div className={s.info}>
                    <h3>{ticket?.session_detail?.movie_name}</h3>
                    <p className={s.location}>{ticket?.session_detail?.cinemahall_detail.cinema_name}</p>
                    <p className={s.place}>
                        {ticket?.seat_detail?.seat_number}st place, {ticket?.seat_detail?.seat_row}st row
                    </p>
                </div>
            </div>
            <div className={s.right}>
                <p>{ticket?.session_detail?.date}<br/>{ticket?.session_detail?.start_time} - {ticket?.session_detail?.end_time}
                </p>
                {
                    !disableBtn && (
                        <>
                            <button className={s.btn} onClick={onClickTicketRemove}>Cancel</button>
                        </>
                    )
                }
            </div>

        </div>
    );
};

export default CartItem;