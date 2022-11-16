import React from 'react';
import s from "./SeatElement.module.scss";

interface SeatElementProps {
    onClickAddTicketOrder?: () => void
    isSeatFree: (id: number) => boolean
    id: number
}

const SeatElement: React.FC<SeatElementProps> = (props) => {

    return (
        <div className={`${s.seat} ${ props.isSeatFree(props.id) && s.active}`} onClick={props.onClickAddTicketOrder}></div>
    )
};

export default SeatElement;