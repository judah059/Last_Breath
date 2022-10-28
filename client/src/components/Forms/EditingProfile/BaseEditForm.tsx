import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import s from './EditForm.module.scss'
import close from '../../../assets/closeCross.svg'
import Button from "../../common/Buttons/Button";

interface BaseEditProps {
    isBaseEditOpened: boolean
    onClickBaseEditClose: () => void
    settingName: string
}

const BaseEdit: React.FC<BaseEditProps> = (props) => {
    return (
        <Popup
            open={props.isBaseEditOpened}
            onClose={props.onClickBaseEditClose}
            modal
            nested
            contentStyle={{width: '600px'}}
            {...{overlayStyle: {overflow: 'auto'}}}>
            <div className={s.editForm}>
                <img src={close} alt={'close'} className={s.closeCross} onClick={props.onClickBaseEditClose}/>
                <label>{props.settingName}:</label>
                <div className={s.fieldBlock}>
                    <input type="text" placeholder={`Enter your ${props.settingName}`} className={s.field}/>
                </div>
                <div className={s.buttonSave}>
                    <Button buttonContent='Save' onClickAction={props.onClickBaseEditClose}/>
                </div>
            </div>
        </Popup>
    )
};

export default BaseEdit;