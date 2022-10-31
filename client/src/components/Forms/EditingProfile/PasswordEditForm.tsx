import React from "react";
import Popup from "reactjs-popup";
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../../utils/api/types";
import {useAppDispatch} from "../../../utils/hooks/redux";

interface PasswordEditProps {
    isPasswordEditFormOpened: boolean
    onClickUsernameEditClose: () => void
}

const PasswordEditForm: React.FC<PasswordEditProps> = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IUser> = async formData => {
        try {
            props.onClickUsernameEditClose()
        } catch (e) {
            alert(e)
            console.log((e as Error).message)
        }
    };

    const clickOnSubmit = () => {

    }

    return (
        <Popup
            open={props.isPasswordEditFormOpened}
            onClose={props.onClickUsernameEditClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickUsernameEditClose}/>
                <label>{'Old password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Enter your old password`} className={s.field}
                           {...register("password", {required: true})}
                    />
                </div>
                {errors.password && <span>All fields are required</span>}
                <label>{'New password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Enter your new password`} className={s.field}
                           {...register("password", {required: true})}
                    />
                </div>
                {errors.password && <span>All fields are required</span>}
                <label>{'Repeat New password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Repeat your new password`} className={s.field}
                           {...register("password", {required: true})}
                    />
                </div>
                {errors.password && <span>All fields are required</span>}
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={clickOnSubmit}/>
                </div>
            </form>

        </Popup>
    )
}

export default PasswordEditForm