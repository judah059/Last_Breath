import React from 'react';
import s from './Ticket.module.scss'
import close from '../../../assets/closeBtn.svg'

interface TicketProps {
    row: number
    price: number
    place: number
}

const Ticket: React.FC<TicketProps> = (props) => {
    return (
        <div className={s.ticketBody}>
            <div className={s.header}>
                <div className={s.row}>
                    {props.row} row
                </div>
                <div className={s.leftWrapper}>
                    <div className={s.price}>
                        {props.price} UAH
                    </div>
                    <div className={s.close}>
                        <img src={close} alt={'close'}/>
                    </div>
                </div>
            </div>
            <div className={s.place}>
                {props.place} PLACE
            </div>
        </div>
    )
};

export default Ticket;