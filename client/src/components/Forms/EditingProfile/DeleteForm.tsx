import React from 'react';
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import Popup from "reactjs-popup";

interface DeleteFormProps {
    isDeleteFormOpened: boolean
    onClickDeleteFormClose?: () => void
}

const DeleteForm: React.FC<DeleteFormProps> = (props) => {
    return (
        <Popup
            open={props.isDeleteFormOpened}
            onClose={props.onClickDeleteFormClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <div className={s.editForm}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickDeleteFormClose}/>
                <label>Why do you want to delete your account?</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Write the reason`} className={s.field}/>
                </div>
                <div className={s.bottomText}>
                    If you describe in detail the problems you encountered, we will be able to improve our work.
                </div>
                <label>Confirm password</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`• • • • • • • • • • • • •`} className={s.field}/>
                </div>
                <div className={s.buttonSave}>
                    <Button buttonContent='Delete' onClickAction={props.onClickDeleteFormClose}/>
                </div>
            </div>
        </Popup>
    )
};

export default DeleteForm;