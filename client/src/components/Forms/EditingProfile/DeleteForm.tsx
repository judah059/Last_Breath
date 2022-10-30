import React from 'react';
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import Popup from "reactjs-popup";
import {useAppDispatch} from "../../../utils/hooks/redux";
import {deleteMe} from "../../../store/user/user.actions";
import {SubmitHandler, useForm} from "react-hook-form";
import {IUser} from "../../../utils/api/types";
import {setEmptyUser} from "../../../store/user/user.slice";

interface DeleteFormProps {
    isDeleteFormOpened: boolean
    onClickDeleteFormClose?: () => void
}

const DeleteForm: React.FC<DeleteFormProps> = (props) => {

    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState: {errors}} = useForm<IUser>();

    const onSubmit: SubmitHandler<IUser> = async formData => {
        try {
            dispatch(setEmptyUser())
            dispatch(deleteMe(formData))
            props.onClickDeleteFormClose?.()
        } catch (e) {
            console.log((e as Error).message)
        }
    }

    const onClickDeleteProfile = () => {

    }

    return (
        <Popup
            open={props.isDeleteFormOpened}
            onClose={props.onClickDeleteFormClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickDeleteFormClose}/>
                <label>Do you really want to delete you`re account?</label>
                {/*<div className={s.fieldBlock}>*/}
                {/*    <input type="text" placeholder={`Write the reason`} className={s.field}/>*/}
                {/*</div>*/}
                {/*<div className={s.bottomText}>*/}
                {/*    If you describe in detail the problems you encountered, we will be able to improve our work.*/}
                {/*</div>*/}
                {/*<label>Confirm password</label>*/}
                {/*<div className={s.fieldBlock}>*/}
                {/*    <input type="text" placeholder={`• • • • • • • • • • • • •`} className={s.field}/>*/}
                {/*</div>*/}
                <div className={s.buttonSave}>
                    <Button buttonContent='Delete' onClickAction={onClickDeleteProfile}/>
                </div>
            </form>
        </Popup>
    )
};

export default DeleteForm;