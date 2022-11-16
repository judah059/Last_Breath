import React from 'react';
import s from "./SeatElement.module.scss";

interface SeatElementProps {
    onClickAddTicketOrder?: () => void
    isSeatFree: (id: number) => boolean
    id: number
    isFree: boolean
}

const SeatElement: React.FC<SeatElementProps> = (props) => {

    return (
        <div className={`${s.seat} ${!props.isFree && s.free} ${ props.isSeatFree(props.id) && s.active}`} onClick={props.onClickAddTicketOrder}>

        </div>
    )
};

export default SeatElement;