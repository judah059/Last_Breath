import React from 'react';
import TicketsHeader from "../../components/TicketsHeader/TicketsHeader";
import s from './TicketsOrderPage.module.scss'
import locationBadge from '../../assets/locationBadge.svg'
import calendarBadge from '../../assets/calendar.svg'
import clockBadge from '../../assets/clock.svg'
import TicketsOrderInformationBlock from "./TicketsOrderInformationBlock";
import {useNavigate} from "react-router-dom";
import SeatElement from "./SeatElement/SeatElement";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/redux";
import {RootState} from "../../store";
import cinema from "../Cinema/Cinema";
import {setRemoveTicket, setTicket} from "../../store/session/session.slice";
import {ITicket} from "../../store/session/session.types";
import Ticket from "./Ticket/Ticket";

const TicketsOrderPage: React.FC = (props) => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const snackPageLoader = () => {
        navigate('/tickets-order/snack')
    }

    const session = useAppSelector((state: RootState) => state.session.current);
    const tickets = useAppSelector((state: RootState) => state.session.ticket);

    const date = session?.date.split("-").reverse().join("/")

    console.log(date)

    let thirdDate = session?.date

    let firstDateDate = undefined

    let day

    if (thirdDate) {
        firstDateDate = new Date(thirdDate);
        console.log(firstDateDate)
        day = firstDateDate.toLocaleString('en-us', {weekday: 'long'});
    }

    let startTime = session?.start_time.slice(0, session?.start_time.length - 3)
    let endTime = session?.end_time.slice(0, session?.end_time.length - 3)

    const onClickAddTicketOrder = (ticket: ITicket) => {
        console.log(ticket)
        const findItem = tickets.find(e => +e.seat_id === +ticket.seat_id);
        if (findItem) {
            dispatch(setRemoveTicket(ticket.seat_id))
        } else {
            dispatch(setTicket(ticket))
        }


    }

    const resultPrice = tickets.reduce((a, b) => a + b.price, 0)
    console.log(resultPrice)

    const isSeatFree = (id: number) => {
        return tickets.some(s => Number(s.seat_id) === Number(id))
    }

    const onClickRemove = (id:number) => {
        dispatch(setRemoveTicket(id))
    }

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.leftSide}>
                    <TicketsHeader/>
                    <div className={s.topBlock}>
                        <>
                            <img
                                src={session?.movie_poster}
                                className={s.poster} alt={'movieImage'}/>
                        </>
                        <div className={s.mediaBlock}>
                            <span className={s.movieName}>{session?.movie_name}</span>
                            <div className={s.textBoxWrapper}>
                                <TicketsOrderInformationBlock badgeUrl={locationBadge}
                                                              upperText={`Hall #${session?.cinemahall}`}
                                                              lowerText={`Cinema "${session?.cinemahall_detail.cinema_name}"`}/>
                                <TicketsOrderInformationBlock badgeUrl={calendarBadge} upperText={date}
                                                              lowerText={day}/>
                                <TicketsOrderInformationBlock badgeUrl={clockBadge} upperText={'Time'}
                                                              lowerText={`${startTime} - ${endTime}`}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.seats}>
                        {session?.seats.map((x, i) => <SeatElement
                            isSeatFree={isSeatFree}
                            id={x.seat_id}
                            onClickAddTicketOrder={() => onClickAddTicketOrder({
                                seat_number: x.seat_number,
                                seat_row: x.seat_row,
                                price: x.seat_additional_price + session?.base_price,
                                seat_id: x.seat_id
                            })}/>)}
                    </div>
                </div>
            </div>
            <div>
                <div className={s.wrapperAside}>
                    <div className={s.rightSide}>
                        <div className={s.topWrapper}>
                            <div className={s.label}>
                                <div className={s.ticketText}>
                                    Tickets
                                </div>
                                <div className={s.ticketsCountPrice}>
                                    {tickets.length} tickets, {resultPrice} UAH
                                </div>
                            </div>
                            <div className={s.ticketList}>
                                {tickets.map(x => <Ticket row={x.seat_row}
                                                          place={x.seat_number}
                                                          price={x.price}
                                                          id={x.seat_id} onClickRemove={onClickRemove}/>)}
                            </div>
                            <div className={s.label}>
                                <div className={s.ticketText}>
                                    Bar goods
                                </div>
                                <div className={s.ticketsCountPrice}>
                                    0 items, 0 UAH
                                </div>
                            </div>
                            <div className={s.snackList}></div>
                        </div>
                        <div className={s.bottomWrapper}>
                            <div className={s.toPayTextAndPrice}>
                                <div className={s.toPayText}>
                                    To pay
                                </div>
                                <div className={s.priceText}>
                                    0 UAH
                                </div>
                            </div>
                            <div className={s.buttonWrapper}>
                                <button onClick={snackPageLoader} className={s.buttonProceed}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TicketsOrderPage;