import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import s from './EditForm.module.scss'
import close from '../../../assets/closeCross.svg'
import Button from "../../common/Buttons/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../../utils/api/types";
import {updateMe} from "../../../store/user/user.actions";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/redux";
import {RootState} from "../../../store";

interface UsernameEditProps {
    isUsernameEditOpened: boolean
    onClickUsernameEditClose: () => void
    settingName: string
}

const UsernameEditForm: React.FC<UsernameEditProps> = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>();
    const dispatch = useAppDispatch();
    let {email, birth_date} = useAppSelector((state: RootState) => state.user);

    const onSubmit: SubmitHandler<IUser> = async formData => {
        try {
            const userData = {
                email, username: formData.username, birth_date
            }
            dispatch(updateMe(userData))
            props.onClickUsernameEditClose?.()
        } catch (e) {
            alert(e)
            console.log((e as Error).message)
        }
    };

    const clickOnSubmit = () => {

    }

    return (
        <Popup
            open={props.isUsernameEditOpened}
            onClose={props.onClickUsernameEditClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickUsernameEditClose}/>
                <label>{props.settingName}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Enter your ${props.settingName}`} className={s.field}
                           maxLength={14}
                           {...register("username", {required: true})}
                    />
                </div>
                {errors.username && <span>All fields are required</span>}
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={clickOnSubmit}/>
                </div>
            </form>
        </Popup>
    )
};

export default UsernameEditForm;