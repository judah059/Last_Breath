import React from 'react';
import s from "./Snack.module.scss";
import close from "../../../../assets/closeBtn.svg";

interface SnackProps {
    id: number
    logo: string,
    name: string,
    price: number
    onClickRemove: (id: number) => void
}

const Snack: React.FC<SnackProps> = (props) => {
    return (
        <div className={s.snackBody}>
            <div className={s.header}>
                <div className={s.leftWrapper}>
                    <div className={s.price}>
                        {props.price} UAH
                    </div>
                    <div className={s.close}>
                        <img src={close} alt={'close'} onClick={()=>props.onClickRemove(props.id)}/>
                    </div>
                </div>
            </div>
            <div className={s.centerBlock}>
                <div>
                    <img src={props.logo} alt={'logo'}/>
                </div>
                <div className={s.name}>
                    {props.name}
                </div>
            </div>
        </div>
    )
};

export default Snack;