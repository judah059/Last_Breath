import React from 'react';
import s from "../CategoryItem.module.scss";

interface SerialItemProps {
    poster: string
    name: string
}

const SerialItem: React.FC<SerialItemProps> = (props) => {
    return (
        <div className={s.seriesBlock}>
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