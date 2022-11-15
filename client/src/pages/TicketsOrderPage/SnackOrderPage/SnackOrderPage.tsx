import React from 'react';
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
import {setRemoveTicket} from "../../../store/session/session.slice";
import Ticket from "../Ticket/Ticket";
import Snack from "./Snack/Snack";

const SnackOrderPage: React.FC = (props) => {

    const dispatch = useAppDispatch()

    const session = useAppSelector((state: RootState) => state.session.current);
    const tickets = useAppSelector((state: RootState) => state.session.ticket);
    const snacks = useAppSelector((state: RootState) => state.session.snack);

    const date = session?.date.split("-").reverse().join("/")

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

    const resultPrice = tickets.reduce((a, b) => a + b.price, 0)

    const onClickRemove = (id:number) => {
        dispatch(setRemoveTicket(id))
    }

    const onClickRemoveSnack = () => {

    }

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
                        {snacks.map((x, index) => <SnackOrderBlock key={index} index={index} emblem={x.logo} itemName={x.name} price={x.price} snack={x}/>)}
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
                            <div className={s.snackList}>
                                <Snack id={1} logo={'https://raw.githubusercontent.com/judah059/Last_Breath/fea10337e65e98a68111f021f374a60f45babdda/client/public/img/mdi_drink.svg'} name={'Popcorn Super Cheese'} price={180} onClickRemove={onClickRemoveSnack}/>
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
                                <button className={s.buttonProceed}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
};

export default SnackOrderPage;