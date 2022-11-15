import React, {useState} from 'react';
import s from './SnackOrderBlock.module.scss'
import {useAppDispatch} from "../../../../utils/hooks/redux";
import {ISnack} from "../../../../store/session/session.types";
import {setRemoveSnackOrder, setSnackOrder} from "../../../../store/session/session.slice";

interface SnackOrderBlockProps {
    emblem: string
    itemName: string
    price: number
    snack: ISnack
    index: number
}

const SnackOrderBlock: React.FC<SnackOrderBlockProps> = (props) => {

    const dispatch = useAppDispatch()

    const [itemCount, setItemCount] = useState(0)

    const itemPlus = (snack: ISnack) => {
        setItemCount(itemCount + 1)
        dispatch(setSnackOrder(snack))
    }

    const itemMinus = (id: number) => {
        setItemCount(p => p<=0 ? 0 : p-1)
        dispatch(setRemoveSnackOrder(id))
    }

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
                        <button className={s.minusButton} onClick={() => itemMinus(props.snack.id)}>
                            -
                        </button>
                    </div>
                    <div className={s.itemCount}>{itemCount}</div>
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