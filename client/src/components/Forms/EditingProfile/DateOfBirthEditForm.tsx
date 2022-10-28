import React from 'react';
import s from "./EditForm.module.scss";
import close from "../../../assets/closeCross.svg";
import Button from "../../common/Buttons/Button";
import Popup from "reactjs-popup";
import range from "lodash.range";

interface DateOfBirthEditFormProps {
    isDateOfBirthEditOpened: boolean
    onClickDateOfBirthClose?: () => void
}

const DateOfBirthEditForm: React.FC<DateOfBirthEditFormProps> = (props) => {
    return (
        <Popup
            open={props.isDateOfBirthEditOpened}
            onClose={props.onClickDateOfBirthClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <div className={s.editForm}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickDateOfBirthClose}/>
                <label>Date of birth</label>
                <div className={s.fieldBlock}>
                    <div className={s.selects}>
                        <select>
                            <option value="" disabled selected>MM</option>
                            {
                                range(1, 13).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select>
                            <option value="" disabled selected>DD</option>
                            {
                                range(1, 32).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                        <select>
                            <option value="" disabled selected>YYYY</option>
                            {
                                range(1900, new Date().getFullYear() + 1).map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={props.onClickDateOfBirthClose}/>
                </div>
            </div>
        </Popup>
    )
};

export default DateOfBirthEditForm;