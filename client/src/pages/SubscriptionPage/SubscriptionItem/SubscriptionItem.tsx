import React from 'react';
import s from './SubscriptionItem.module.scss'

interface SubscriptionItemProps {
    subName: string
    price: string
    quality: string
    downloadSpeed: string
    onClickAction: (subName: string) => void
    active: boolean
}


const SubscriptionItem: React.FC<SubscriptionItemProps> = (props) => {

    const clickAction = () => {
        props.onClickAction(props.subName)
    }

    return (
        <div className={s.wrapperBox}>
            {props.active ? <>
                    <div className={s.subName} onClick={clickAction} style={{background: 'red'}}>
                        {props.subName}
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
                        {props.subName}
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