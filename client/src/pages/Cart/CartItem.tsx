import React from 'react';
import s from "./Cart.module.scss";
import mov from "../../assets/tempMovieImage.jpg";

interface CartItemProps {
    disableBtn?: boolean
}


const CartItem: React.FC<CartItemProps> = ({disableBtn=false}) => {

    return (
        <div className={`${s.item} ${disableBtn && s.disabled}`}>
            <div className={s.left}>
                <img src={mov} alt="movie" width={125}/>
                <div className={s.info}>
                    <h3>Doctor Strange 2</h3>
                    <p className={s.location}>Kharkiv, KinoLand</p>
                    <p className={s.place}>1st place, 1st row , 2st place, 1st row</p>
                    <p className={s.addition}>Popcorn Super Cheese</p>
                </div>
            </div>
            <div className={s.right}>
                <p>Sat, June 11<br/>11:00 - 13:10</p>
                {
                    !disableBtn && (
                        <>
                            <button className={s.btn}>Cancel</button>
                            <button className={s.btn}>Pay</button>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default CartItem;