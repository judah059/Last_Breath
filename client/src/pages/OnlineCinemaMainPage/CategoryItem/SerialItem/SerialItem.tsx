import React from 'react';
import s from "../CategoryItem.module.scss";

interface SerialItemProps {
    id: number
    type: string
    poster: string
    name: string
    onClickAction: (id: number, type: string) => void
}

const SerialItem: React.FC<SerialItemProps> = (props) => {
    return (
        <div className={s.seriesBlock} onClick={() => props.onClickAction(props.id, props.type)}>
            <div>
                <img src={props.poster} alt={'poster'}/>
            </div>
            <div className={s.name}>
                {props.name}
            </div>
        </div>
    )
};

export default SerialItem;