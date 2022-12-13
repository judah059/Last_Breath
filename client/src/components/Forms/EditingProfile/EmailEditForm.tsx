import React, {useState} from 'react';
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
import {ErrorMessage} from "@hookform/error-message";
import CustomErrorMessage from "../../common/CustomErrorMessage/CustomErrorMessage";

interface EmailEditProps {
    isEmailEditOpened: boolean
    onClickEmailEditClose: () => void
    settingName: string
}

const EmailEdit: React.FC<EmailEditProps> = (props) => {

    const {register, handleSubmit, formState: {errors}} = useForm<IUser>();
    const [responseError, setResponseError] = useState(false);
    const [responseErrorMsg, setResponseErrorMsg] = useState('');
    const dispatch = useAppDispatch();
    let {username, birth_date, error} = useAppSelector((state: RootState) => state.user);

    const onSubmit: SubmitHandler<IUser> = async formData => {
        try {
            const userData = {
                email: formData.email, username, birth_date
            }
            const res = await dispatch(updateMe(userData))

            if (res.payload === undefined) {
                setResponseErrorMsg('ERR_CONNECTION_REFUSED')
                setResponseError(true)
            } else if (typeof res.payload === 'string') {
                const resMsg = JSON.parse(res.payload as string)
                setResponseErrorMsg(resMsg.email)
                setResponseError(true)
            } else {
                props.onClickEmailEditClose?.()
            }
        } catch (e) {
            setResponseError(true);
            console.log((e as Error).message)
        }
    };

    const clickOnSubmit = () => {

    }

    return (
        <Popup
            open={props.isEmailEditOpened}
            onClose={props.onClickEmailEditClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <form className={s.editForm} onSubmit={handleSubmit(onSubmit)}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickEmailEditClose}/>
                <label>{props.settingName}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Enter your ${props.settingName}`} className={s.field}
                           maxLength={14}
                           {...register("email", {
                               required: true, pattern: {
                                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                   message: "Invalid email address"
                               }
                           })}
                    />
                </div>
                <ErrorMessage errors={errors} name="email" as="p" className={s.errorMsg}/>
                {responseError && <CustomErrorMessage msgContent={responseErrorMsg}/>}
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={clickOnSubmit}/>
                </div>
            </form>
        </Popup>
    )
};

export default EmailEdit;