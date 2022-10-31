import React, {useState} from "react";
import Popup from "reactjs-popup";
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {IChangePassword, IUser} from "../../../utils/api/types";
import {useAppDispatch} from "../../../utils/hooks/redux";
import {updateMe, updatePassword} from "../../../store/user/user.actions";
import {ErrorMessage} from "@hookform/error-message";
import CustomErrorMessage from "../../common/CustomErrorMessage/CustomErrorMessage";

interface PasswordEditProps {
    isPasswordEditFormOpened: boolean
    onClickUsernameEditClose: () => void
}

interface IResError {
    password?: string[]
    old_password?: string
    custom?: string
}

const PasswordEditForm: React.FC<PasswordEditProps> = (props) => {

    const {register, handleSubmit, formState: {errors}, watch, reset} = useForm<IChangePassword>();
    const [responseError, setResponseError] = useState(false);
    const [responseErrorMsg, setResponseErrorMsg] = useState<IResError>({});
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<IChangePassword> = async formData => {
        try {
            const res = await dispatch(updatePassword(formData))

            console.log(res)

            if (res.payload === undefined) {
                setResponseErrorMsg({custom: 'ERR_CONNECTION_REFUSED'})
                setResponseError(true)
            } else if (typeof res.payload === 'string') {
                const resMsg = JSON.parse(res.payload as string)
                setResponseErrorMsg(resMsg.old_password)
                setResponseError(true)
            } else {
                setResponseError(false)
                reset()
                alert('Password has successfully changed!')
                props.onClickUsernameEditClose()
            }
        } catch (e) {
            setResponseError(true);
            console.log((e as Error).message)
        }
    };

    const clickOnSubmit = () => {

    }

    const onCloseAction = () => {
        props.onClickUsernameEditClose()
        setResponseError(false)
        reset()
    }

    return (
        <Popup
            open={props.isPasswordEditFormOpened}
            onClose={onCloseAction}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickUsernameEditClose}/>
                <label>{'Old password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="password" placeholder={`Enter your old password`} className={s.field}
                           {...register("old_password", {required: 'This field is required'})}
                    />
                </div>
                <ErrorMessage errors={errors} name="old_password" as="p" className={s.errorMsg}/>
                {responseError && <CustomErrorMessage msgContent={responseErrorMsg.old_password}/>}
                <label>{'New password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="password" placeholder={`Enter your new password`} className={s.field}
                           {...register("password", {required: 'This field is required'})}
                    />
                </div>
                <ErrorMessage errors={errors} name="password" as="p" className={s.errorMsg}/>
                <label>{'Repeat New password'}:</label>
                <div className={s.fieldBlock}>
                    <input type="password" placeholder={`Repeat your new password`} className={s.field}
                           {...register("password2", {
                               required: "This field is required", validate: (val: string) => {
                                   if (watch('password') != val) {
                                       return "Your passwords do no match";
                                   }
                               }
                           })}
                    />
                </div>
                <ErrorMessage errors={errors} name="password2" as="p" className={s.errorMsg}/>
                {/*{responseError && <CustomErrorMessage msgContent={responseErrorMsg?.password?.toString()}/>}*/}
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={clickOnSubmit}/>
                </div>
            </form>

        </Popup>
    )
}

export default PasswordEditForm