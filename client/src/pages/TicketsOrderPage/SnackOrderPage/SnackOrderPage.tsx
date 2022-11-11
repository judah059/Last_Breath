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

const SnackOrderPage: React.FC = (props) => {
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
                                <TicketsOrderInformationBlock badgeUrl={locationBadge} upperText={'Hall #1'}
                                                              lowerText={'Cinema “KinoLand”'}/>
                                <TicketsOrderInformationBlock badgeUrl={calendarBadge} upperText={'11.06.2022'}
                                                              lowerText={'Saturday'}/>
                                <TicketsOrderInformationBlock badgeUrl={clockBadge} upperText={'Time'}
                                                              lowerText={'11:00 - 13:10'}/>
                            </div>
                        </div>
                    </div>
                    <div className={s.underPosterText}>Buy online, pick up at a separate checkout. That's faster!</div>
                    <div className={s.snacks}>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
                        <SnackOrderBlock emblem={popcornBadge} itemName={'Popcorn Super \n Cheese'} price={'180'}/>
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
                                    0 tickets, 0 UAH
                                </div>
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
                            <div className={s.ticketList}></div>
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