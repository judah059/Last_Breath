import React from 'react';
import s from './CategoryItem.module.scss'
import SerialItem from "./SerialItem/SerialItem";
import {IOnlineCinemaItem} from "../../../utils/api/types";

interface CategoryItemPros {
    categoryName: string
    films: IOnlineCinemaItem[]
    serials: IOnlineCinemaItem[]
}

const CategoryItem: React.FC<CategoryItemPros> = (props) => (
    <div className={s.content}>
        <div className={s.categoryName}>
            {props.categoryName}
        </div>
        <div className={s.serial}>
            {props.films.slice(0, 3).map(f => <SerialItem poster={f.poster} name={f.name}/>)}
            {props.serials.slice(0, 3).map(f => <SerialItem poster={f.poster} name={f.name}/>)}
        </div>
    </div>
);

export default CategoryItem;