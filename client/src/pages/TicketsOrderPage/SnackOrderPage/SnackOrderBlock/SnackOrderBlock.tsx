import React, {useState} from 'react';
import s from './SnackOrderBlock.module.scss'
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/redux";
import {ISnack} from "../../../../store/session/session.types";
import {setRemoveSnackOrder, setSnackOrder} from "../../../../store/session/session.slice";
import {RootState} from "../../../../store";

interface SnackOrderBlockProps {
    emblem: string
    itemName: string
    price: number
    snack: ISnack
    index: number
}

const SnackOrderBlock: React.FC<SnackOrderBlockProps> = (props) => {
    const snackIndex = useAppSelector((state: RootState) => state.session.snackIndex);
    const snackOrder = useAppSelector((state: RootState) => state.session.snackOrder);
    const dispatch = useAppDispatch()


    const itemPlus = (snack: ISnack) => {
        dispatch(setSnackOrder(snack))
    }

    const itemMinus = (index: number) => {
        const snackType = snackOrder.filter(p => p.id === props.index + 1)
        const lastTypeId = snackType[snackType.length-1]?.index
        const snackLength = snackOrder.filter(s=>s.id === props.snack.id).length

        if(snackLength !== 0){
            dispatch(setRemoveSnackOrder(lastTypeId))
        }


    }

    const snackCount = snackOrder.filter(p => p.id === props.index + 1).length

    return (
        <div className={s.block}>
            <div className={s.emblemBlock}>
                <div>
                    <img src={props.emblem} alt={'item'} className={s.emblem}/>
                </div>
                <div className={s.itemName}>
                    {props.itemName}
                </div>
            </div>
            <div className={s.priceBlock}>
                <div className={s.price}>
                    {props.price} UAH
                </div>
                <div className={s.itemCountBlock}>
                    <div>
                        <button className={s.minusButton} onClick={() => itemMinus(props.index)}>
                            -
                        </button>
                    </div>
                    <div className={s.itemCount}>{snackCount}</div>
                    <div>
                        <button className={s.plusButton} onClick={() => itemPlus(props.snack)}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SnackOrderBlock;