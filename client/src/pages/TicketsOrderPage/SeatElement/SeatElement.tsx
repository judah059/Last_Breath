import React from 'react';
import s from "./SeatElement.module.scss";

interface SeatElementProps {
    onClickAddTicketOrder?: () => void
    isActive: boolean
}

const SeatElement: React.FC<SeatElementProps> = (props) => {
    return (
        <div className={`${s.seat} ${props.isActive && s.active}`} onClick={props.onClickAddTicketOrder}></div>
    )
};

export default SeatElement;