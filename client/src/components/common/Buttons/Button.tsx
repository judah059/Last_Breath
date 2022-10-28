import React from 'react';
import s from './Button.module.scss'

interface ButtonProps {
    buttonContent: string
    onClickAction?: () => void
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={s.button} onClick={props.onClickAction}>{props.buttonContent}</button>
    )
};

export default Button;