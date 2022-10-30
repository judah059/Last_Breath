import React from 'react';
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import Popup from "reactjs-popup";
import range from "lodash.range";
import {SubmitHandler, useForm} from "react-hook-form";
import {DateOfBirth} from "../../../utils/api/types";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux";
import {updateMe} from "../../../store/user/user.actions";
import {RootState} from "../../../store";

interface DateOfBirthEditFormProps {
    isDateOfBirthEditOpened: boolean
    onClickDateOfBirthClose?: () => void
}

const DateOfBirthEditForm: React.FC<DateOfBirthEditFormProps> = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<DateOfBirth>();
    const dispatch = useAppDispatch();
    const {email, username} = useAppSelector((state: RootState) => state.user);


    const onSubmit: SubmitHandler<DateOfBirth> = async formData => {
        try {
            const birth_date = `${formData.year}-${formData.month}-${formData.day}`

            const userData = {
                email, username, birth_date
            }
            dispatch(updateMe(userData))
            props.onClickDateOfBirthClose?.()
        } catch (e) {

            console.log((e as Error).message)
        }
    };

    const clickOnSubmit = () => {

    }

    return (
        <Popup
            open={props.isDateOfBirthEditOpened}
            onClose={props.onClickDateOfBirthClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickDateOfBirthClose}/>
                <label>Date of birth</label>
                <div className={s.fieldBlock}>
                    <div className={s.selects}>
                        <select
                            {...register("month", {required: true})}
                        >
                            <option value="" disabled selected>MM</option>
                            {
                                range(1, 13).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select
                            {...register("day", {required: true})}>
                            <option value="" disabled selected>DD</option>
                            {
                                range(1, 32).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select
                            {...register("year", {required: true})}>
                            <option value="" disabled selected>YYYY</option>
                            {
                                range(1900, new Date().getFullYear() + 1).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                {(errors.day || errors.year || errors.month) && <span>All fields are required</span>}
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={clickOnSubmit}/>
                </div>
            </form>
        </Popup>
    )
};

export default DateOfBirthEditForm;