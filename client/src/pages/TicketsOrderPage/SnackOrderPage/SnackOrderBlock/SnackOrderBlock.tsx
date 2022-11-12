import React, {useState} from 'react';
import s from './SnackOrderBlock.module.scss'

interface SnackOrderBlockProps {
    emblem: string
    itemName: string
    price: string
}

const SnackOrderBlock: React.FC<SnackOrderBlockProps> = (props) => {

    const [itemCount, setItemCount] = useState(0)

    const itemPlus = () => {
        setItemCount(itemCount + 1)
    }

    const itemMinus = () => {
        setItemCount(p => p<=0 ? 0 : p-1)
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
                        <button className={s.minusButton} onClick={itemMinus}>
                            -
                        </button>
                    </div>
                    <div className={s.itemCount}>{itemCount}</div>
                    <div>
                        <button className={s.plusButton} onClick={itemPlus}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SnackOrderBlock;