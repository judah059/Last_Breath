import React from 'react';
import s from './CategoryItem.module.scss'
import SerialItem from "./SerialItem/SerialItem";
import {IOnlineCinemaItem} from "../../../utils/api/types";
import {useNavigate} from "react-router-dom";
import {setItemId, setItemType} from "../../../store/onlineItem/onlineItem.slice";
import {useAppDispatch} from "../../../utils/hooks/redux";

interface CategoryItemPros {
    categoryName: string
    films: IOnlineCinemaItem[]
    serials: IOnlineCinemaItem[]
}

const CategoryItem: React.FC<CategoryItemPros> = (props) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickAction = (id: number, itemType: string) => {
        dispatch(setItemId(id))
        dispatch(setItemType(itemType))
        navigate(`watch/${id}`)
    }

    return (
        <div className={s.content}>
            <div className={s.categoryName}>
                {props.categoryName}
            </div>
            <div className={s.serial}>
                {props.films.slice(0, 3).map(f => <SerialItem poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'film'}/>)}
                {props.serials.slice(0, 3).map(f => <SerialItem poster={f.poster} name={f.name} onClickAction={onClickAction} id={f.id} type={'serial'}/>)}
            </div>
        </div>
    )
};

export default CategoryItem;