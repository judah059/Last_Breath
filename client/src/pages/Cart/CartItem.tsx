import React from 'react';
import s from "./Cart.module.scss";
import mov from "../../assets/tempMovieImage.jpg";

interface CartItemProps {

}


const CartItem: React.FC<CartItemProps> = () => {
    return (
        <div className={s.item}>
            <div className={s.left}>
                <img src={mov} alt="" width={125}/>
                <div className={s.info}>
                    <h3>Doctor Strange 2</h3>
                    <p className={s.location}>Kharkiv, KinoLand</p>
                    <p className={s.place}>1st place, 1st row , 2st place, 1st row</p>
                    <p className={s.addition}>Popcorn Super Cheese</p>
                </div>
            </div>
            <div className={s.right}>
                <p>Sat, June 11<br/>11:00 - 13:10</p>
                <button className={s.btn}>Сancel</button>
                <button className={s.btn}>Pay</button>
            </div>
        </div>
    );
};

export default CartItem;