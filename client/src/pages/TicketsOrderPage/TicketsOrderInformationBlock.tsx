import React from 'react';
import s from './TicketsOrderPage.module.scss'

interface TicketsOrderInformationBlockProps  {
    badgeUrl?: string
    upperText?: string
    lowerText? :string
}

const TicketsOrderInformationBlock: React.FC<TicketsOrderInformationBlockProps> = (props) => {
    return (
        <div className={s.locationBox}>
            <div className={s.logoBox}>
                <img src={props.badgeUrl} alt={'location'} className={s.logo}/>
            </div>
            <div className={s.locationBoxText}>
                <div className={s.upperText}>
                    {props.upperText}
                </div>
                <div className={s.lowerText}>
                    {props.lowerText}
                </div>
            </div>
        </div>
    )
};

export default TicketsOrderInformationBlock;