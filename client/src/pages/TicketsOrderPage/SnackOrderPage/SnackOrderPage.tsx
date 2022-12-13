import React, {useEffect, useState} from 'react';
import s from "./SnackOrderPage.module.scss";
import TicketsHeader from "../../../components/TicketsHeader/TicketsHeader";
import TicketsOrderInformationBlock from "../TicketsOrderInformationBlock";
import locationBadge from "../../../assets/locationBadge.svg";
import calendarBadge from "../../../assets/calendar.svg";
import clockBadge from "../../../assets/clock.svg";
import popcornBadge from "../../../assets/emojione_popcorn.svg"
import drinkBadge from "../../../assets/mdi_drink.svg"
import SnackOrderBlock from "./SnackOrderBlock/SnackOrderBlock";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";
import {
    setEmptyTicket,
    setOrder,
    setRemoveSnackOrder,
    setRemoveTicket,
    setTicket
} from "../../../store/session/session.slice";
import Ticket from "../Ticket/Ticket";
import Snack from "./Snack/Snack";
import {useNavigate} from "react-router-dom";
import {API} from "../../../utils/api";
import {useAuth} from "../../../utils/hooks/useAuth";

const SnackOrderPage: React.FC = (props) => {

    const dispatch = useAppDispatch()

    const snackIndex = useAppSelector((state: RootState) => state.session.snackIndex);
    const session = useAppSelector((state: RootState) => state.session.current);
    const tickets = useAppSelector((state: RootState) => state.session.ticket);
    const snacks = useAppSelector((state: RootState) => state.session.snack);
    const snackOrder = useAppSelector((state: RootState) => state.session.snackOrder);
    const city = useAppSelector((state: RootState) => state.session.city);
    const user = useAppSelector((state: RootState) => state.user);
    const [error, setError] = useState(false)




    const date = session?.date.split("-").reverse().join("/")

    let thirdDate = session?.date

    let firstDateDate = undefined

    let day

    if (thirdDate) {
        firstDateDate = new Date(thirdDate);
        day = firstDateDate.toLocaleString('en-us', {weekday: 'long'});
    }

    let startTime = session?.start_time.slice(0, session?.start_time.length - 3)
    let endTime = session?.end_time.slice(0, session?.end_time.length - 3)

    const ticketPrice = tickets.reduce((a, b) => a + b.price, 0)
    const snacksPrice = snackOrder.reduce((a, b) => a + b.price, 0)

    const resultPrice = ticketPrice + snacksPrice

    const onClickRemove = (id: number) => {
        dispatch(setRemoveTicket(id))
    }

    const onClickRemoveSnack = (id?: number) => {
        console.log(id)
        if(snackOrder.length !== 0){
            dispatch(setRemoveSnackOrder(id))
        }

    }
    const navigate = useNavigate()
    const onClickProceed = async () => {
        dispatch(setEmptyTicket())
        try {
            if (snackOrder.length !== 0 || tickets.length !== 0) {
                setError(false)
                dispatch(setOrder({tickets, snackOrder, session, city}))

                for (let i = 0; i < tickets.length; i++) {
                    await API.postTicket({session: session?.id, session_seat: tickets[i].id});
                }

                if (snackOrder.length !== 0) {
                    for (let i = 0; i < snackOrder.length; i++) {
                        let obj = {
                            amount: snackOrder.filter(s => s.id === snackOrder[i].id)?.length,
                            snack: snackOrder.filter(s => s.id === snackOrder[i].id)[0]?.id,
                            user: user.id
                        }
                        await API.postSnack(obj);
                    }
                }
                navigate('/cart')
            } else {
                setError(true)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (session === null) {
            return navigate('/main');
        }
    }, [session]);

    return (
        <div className={s.wrapper}>
            <div>
                <div className={s.leftSide}>
                    <TicketsHeader/>
                    <div className={s.topBlock}>
                        <>
                            <img
                                src={"https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UY720_.jpg"}
                                className={s.poster} alt={'movieImage'}/>
                        </>
                        <div className={s.mediaBlock}>
                            <span className={s.movieName}>Black Adam</span>
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
                    <div className={s.underPosterText}>Buy online, pick up at a separate checkout. That's faster!</div>
                    <div className={s.snacks}>
                        {snacks.map((x, index) => <SnackOrderBlock key={index} index={index} emblem={x.logo}
                                                                   itemName={x.name} price={x.price} snack={x}/>)}
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
                                    {tickets.length} tickets, {ticketPrice} UAH
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
                                    {snackOrder.length} items, {snacksPrice} UAH
                                </div>
                            </div>
                            <div className={s.snackList}>
                                {
                                    snackOrder.map(s => <Snack id={s.id} logo={s.logo} name={s.name} price={s.price} index={s.index}
                                                               onClickRemove={onClickRemoveSnack}/>)
                                }
                            </div>
                            <div className={s.ticketList}></div>
                        </div>
                        <div className={s.bottomWrapper}>
                            <div className={s.toPayTextAndPrice}>
                                <div className={s.toPayText}>
                                    To pay
                                </div>
                                <div className={s.priceText}>
                                    {resultPrice} UAH
                                </div>
                            </div>
                            <div className={s.buttonWrapper}>
                                {
                                    error && <p>Please choose a seat/bar item</p>
                                }
                                <button className={s.buttonProceed} onClick={onClickProceed}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SnackOrderPage;