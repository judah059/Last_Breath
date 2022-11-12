import React from 'react';
import s from './Button.module.scss'
import {SubmitHandler} from "react-hook-form";
import {DateOfBirth} from "../../../utils/api/types";

interface ButtonProps {
    buttonContent: string
    onClickAction?: () => void | SubmitHandler<DateOfBirth>
}

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button type={"submit"} className={s.button} onClick={props.onClickAction}>{props.buttonContent}</button>
    )
};

export default Button;