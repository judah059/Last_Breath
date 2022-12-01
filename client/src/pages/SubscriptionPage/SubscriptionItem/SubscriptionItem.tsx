import React from 'react';
import s from './SubscriptionItem.module.scss'
import {convertSubPlanName} from "../../../utils/ConvertSubNameToFull";

interface SubscriptionItemProps {
    id: number
    subName: string
    price: number
    quality: string
    downloadSpeed: string
    onClickAction: (subName: string, id: number) => void
    active?: boolean
}


const SubscriptionItem: React.FC<SubscriptionItemProps> = (props) => {

    const clickAction = () => {
        props.onClickAction(props.subName, props.id)
    }

    return (
        <div className={s.wrapperBox}>
            {props.active ? <>
                    <div className={s.subName} onClick={clickAction} style={{background: 'red'}}>
                        {convertSubPlanName(props.subName)}
                    </div>
                    <div style={{color: 'red'}}>
                        {props.price}$
                    </div>
                    <div style={{color: 'red'}}>
                        {props.quality}p
                    </div>
                    <div style={{color: 'red'}}>
                        {props.downloadSpeed} MB/S
                    </div>
                </>
                :
                <>
                    <div className={s.subName} onClick={clickAction}>
                        {convertSubPlanName(props.subName)}
                    </div>
                    <div>
                        {props.price}$
                    </div>
                    <div>
                        {props.quality}p
                    </div>
                    <div>
                        {props.downloadSpeed} MB/S
                    </div>
                </>

            }
        </div>
    );
};

export default SubscriptionItem;